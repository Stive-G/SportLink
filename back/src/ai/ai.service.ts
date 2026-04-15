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
    const equipment = await this.equipmentService.findAll();
    const availableEquipment = equipment.filter((item) => item.available && item.quantity > 0);
    const catalog = availableEquipment.length > 0 ? availableEquipment : equipment;

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
      quantity: item.quantity,
      available: item.available,
      description: item.description,
    }));

    return `
Tu es l’assistant IA de SportLink, une application de réservation de matériel sportif.
Ta mission est de recommander uniquement du matériel présent dans le catalogue fourni.

Regles:
- Reponds en francais.
- Priorise le matériel disponible avec quantity > 0.
- Ne recommande pas de matériel absent du catalogue.
- Donne des raisons courtes, utiles et liées à l’activité.
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
      const availableNames = new Set(
        catalog
          .filter((item) => item.available && item.quantity > 0)
          .map((item) => item.name.toLowerCase()),
      );

      return {
        activity: parsed.activity || prompt,
        recommendedEquipment: (parsed.recommendedEquipment || [])
          .filter((item) => availableNames.size === 0 || availableNames.has(item.name.toLowerCase()))
          .slice(0, 5),
        explanation:
          parsed.explanation ||
          'Voici le matériel recommandé à partir du catalogue SportLink disponible.',
        optionalTips:
          parsed.optionalTips?.length > 0
            ? parsed.optionalTips
            : [
                'Vérifier la disponibilité avant la réservation.',
                'Adapter les quantités au nombre de participants.',
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
        'Recommandation générée à partir du catalogue SportLink, sans appel IA externe disponible.',
      optionalTips: [
        'Vérifier la disponibilité avant la réservation.',
        'Prévoir du matériel d’organisation si plusieurs équipes participent.',
        'Adapter les quantités au nombre de joueurs.',
      ],
      source: 'fallback',
    };
  }
}
