import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { Equipment } from '../schemas/equipment.schema';
import { EquipmentService } from '../equipment/equipment.service';

type RecommendationEquipment = {
  id?: string;
  name: string;
  sport?: string;
  category?: string;
  reason: string;
};

export type RecommendationResult = {
  activity: string;
  recommendedEquipment: RecommendationEquipment[];
  explanation: string;
  optionalTips: string[];
  source: 'llm' | 'fallback';
};

type EquipmentWithId = Equipment & { _id?: { toString(): string } };

@Injectable()
export class AiService {
  private client: OpenAI;
  private model: string;

  constructor(private readonly equipmentService: EquipmentService) {
    this.model = process.env.LLM_MODEL || 'mistral-small-latest';
    this.client = new OpenAI({
      apiKey: process.env.LLM_API_KEY || process.env.LITELLM_API_KEY || 'missing-key',
      // Mistral expose une API compatible OpenAI, donc on garde le SDK déjà présent.
      baseURL:
        process.env.LLM_BASE_URL ||
        process.env.LITELLM_BASE_URL ||
        'https://api.mistral.ai/v1',
    });
  }

  async recommend(prompt: string): Promise<RecommendationResult> {
    const catalog = await this.equipmentService.findAll();

    if (!process.env.LLM_API_KEY && !process.env.LITELLM_API_KEY) {
      return this.buildFallbackRecommendation(prompt, catalog);
    }

    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: this.buildRecommendationPrompt(prompt, catalog),
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 800,
      });

      const content = response.choices[0]?.message.content;
      if (!content) {
        return this.buildFallbackRecommendation(prompt, catalog);
      }

      return this.parseRecommendation(content, prompt, catalog);
    } catch (error) {
      // On conserve un fallback propre pour que la démo publique reste utile même si le provider IA est indisponible.
      console.error('AI recommendation error:', error);
      return this.buildFallbackRecommendation(prompt, catalog);
    }
  }

  private buildRecommendationPrompt(userRequest: string, equipmentList: EquipmentWithId[]) {
    const simplifiedCatalog = equipmentList.map((item) => ({
      id: item._id?.toString(),
      name: item.name,
      sport: item.sport,
      category: item.category,
      description: item.description,
    }));

    return `
Tu es l’assistant SportLink, un assistant de préparation d’activités sportives.\nSportLink ne loue pas de matériel et ne gère pas de stock physique.\nTa mission est d’aider l’utilisateur à préparer une séance réaliste et à choisir le matériel utile parmi la bibliothèque fournie.

Regles:
- Reponds en francais.
- Ne recommande pas de matériel absent de la bibliothèque.\n- Ne parle jamais de réservation, de stock, de disponibilité, d’emprunt ou de retour.\n- Adapte les conseils au nombre de participants, au lieu, au niveau et à la durée lorsque ces informations sont données.\n- Donne des raisons courtes, utiles et liées à l’activité.
- Retourne uniquement un JSON valide, sans markdown.

Format exact attendu:
{
  "activity": "${userRequest}",
  "recommendedEquipment": [
    { "id": "id si disponible", "name": "nom", "sport": "sport", "category": "catégorie", "reason": "raison utile" }
  ],
  "explanation": "explication courte",
  "optionalTips": ["conseil 1", "conseil 2"],
  "source": "llm"
}

Catalogue disponible:
${JSON.stringify(simplifiedCatalog, null, 2)}
`;
  }

  private parseRecommendation(
    content: string,
    prompt: string,
    catalog: EquipmentWithId[],
  ): RecommendationResult {
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : content) as RecommendationResult;
      const catalogNames = new Set(catalog.map((item) => item.name.toLowerCase()));

      return {
        activity: parsed.activity || prompt,
        recommendedEquipment: (parsed.recommendedEquipment || [])
          .filter((item) => catalogNames.has(item.name.toLowerCase()))
          .slice(0, 5),
        explanation:
          parsed.explanation ||
          'Voici une préparation de séance construite à partir de la bibliothèque SportLink.',
        optionalTips:
          parsed.optionalTips?.length > 0
            ? parsed.optionalTips
            : [
                'Adapter le matériel au nombre de participants.',
                'Vérifier les règles et les équipements déjà présents sur le lieu.',
              ],
        source: 'llm',
      };
    } catch {
      return this.buildFallbackRecommendation(prompt, catalog);
    }
  }

  private buildFallbackRecommendation(
    prompt: string,
    catalog: EquipmentWithId[],
  ): RecommendationResult {
    const words = prompt.toLowerCase().split(/\W+/).filter(Boolean);
    const source = catalog.length > 0 ? catalog : [];

    const recommendedEquipment = source
      .map((item) => {
        const searchable = `${item.name} ${item.sport} ${item.category} ${item.description}`.toLowerCase();
        const score = words.reduce((total, word) => total + (searchable.includes(word) ? 1 : 0), 0);
        return { item, score };
      })
      .sort((first, second) => second.score - first.score || first.item.name.localeCompare(second.item.name))
      .slice(0, 4)
      .map(({ item }) => ({
        id: item._id?.toString(),
        name: item.name,
        sport: item.sport,
        category: item.category,
        reason: `Cet équipement correspond au sport ${item.sport} et à la catégorie ${item.category}.`,
      }));

    return {
      activity: prompt,
      recommendedEquipment,
      explanation:
        'Préparation générée à partir de la bibliothèque SportLink, sans appel IA externe disponible.',
      optionalTips: [
        'Adapter le matériel au nombre de participants.',
        'Prévoir du matériel d’organisation si plusieurs équipes participent.',
        'Vérifier les règles du lieu avant de commencer.',
      ],
      source: 'fallback',
    };
  }
}
