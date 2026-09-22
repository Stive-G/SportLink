import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

type RecommendationItem = {
  name: string;
  reason: string;
};

export type RecommendationResult = {
  activity: string;
  recommendedItems: RecommendationItem[];
  explanation: string;
  optionalTips: string[];
  source: 'llm' | 'fallback';
};

@Injectable()
export class AiService {
  private client: OpenAI;
  private model: string;

  constructor() {
    this.model = process.env.LLM_MODEL || 'mistral-small-latest';
    this.client = new OpenAI({
      apiKey: process.env.LLM_API_KEY || process.env.LITELLM_API_KEY || 'missing-key',
      baseURL:
        process.env.LLM_BASE_URL ||
        process.env.LITELLM_BASE_URL ||
        'https://api.mistral.ai/v1',
    });
  }

  async recommend(prompt: string): Promise<RecommendationResult> {
    if (!process.env.LLM_API_KEY && !process.env.LITELLM_API_KEY) {
      return this.buildFallbackRecommendation(prompt);
    }

    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: this.buildRecommendationPrompt(prompt),
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.35,
        max_tokens: 900,
      });

      const content = response.choices[0]?.message.content;
      if (!content) {
        return this.buildFallbackRecommendation(prompt);
      }

      return this.parseRecommendation(content, prompt);
    } catch (error) {
      console.error('AI recommendation error:', error);
      return this.buildFallbackRecommendation(prompt);
    }
  }

  private buildRecommendationPrompt(userRequest: string) {
    return [
      "Tu es l'assistant SportLink, un assistant de préparation d'activités sportives.",
      "SportLink ne loue pas de matériel, ne gère aucun stock physique et ne vend aucun équipement.",
      "",
      "Ta mission:",
      "- comprendre le sport, le nombre de participants, la durée, le niveau et le lieu quand ces informations sont fournies;",
      "- proposer une petite checklist de matériel utile, uniquement comme conseil de préparation;",
      "- proposer des conseils d'organisation concrets;",
      "- rappeler de vérifier les règles du lieu et ce qui est déjà disponible sur place.",
      "",
      "Règles:",
      "- Réponds en français.",
      "- Ne parle jamais de réservation, de stock, d'emprunt, de retrait, de retour ou de disponibilité SportLink.",
      "- N'invente pas que SportLink possède le matériel.",
      "- Reste prudent: les recommandations sont générales et doivent être adaptées aux règles du lieu.",
      "- Retourne uniquement un JSON valide, sans markdown.",
      "",
      "Format exact:",
      "{",
      '  "activity": "' + userRequest.replace(/"/g, '\\"') + '",',
      '  "recommendedItems": [',
      '    { "name": "élément utile", "reason": "raison concrète" }',
      "  ],",
      '  "explanation": "résumé pratique de la séance",',
      '  "optionalTips": ["conseil 1", "conseil 2", "conseil 3"],',
      '  "source": "llm"',
      "}",
    ].join("\n");
  }

  private parseRecommendation(content: string, prompt: string): RecommendationResult {
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : content) as Partial<RecommendationResult>;

      const recommendedItems = Array.isArray(parsed.recommendedItems)
        ? parsed.recommendedItems
            .filter(
              (item): item is RecommendationItem =>
                Boolean(item) &&
                typeof item.name === 'string' &&
                typeof item.reason === 'string',
            )
            .slice(0, 8)
        : [];

      return {
        activity: typeof parsed.activity === 'string' && parsed.activity ? parsed.activity : prompt,
        recommendedItems,
        explanation:
          typeof parsed.explanation === 'string' && parsed.explanation
            ? parsed.explanation
            : 'Voici une préparation de séance adaptée au contexte décrit.',
        optionalTips: Array.isArray(parsed.optionalTips)
          ? parsed.optionalTips.filter((tip): tip is string => typeof tip === 'string').slice(0, 8)
          : [
              'Vérifier les règles du lieu avant de commencer.',
              'Adapter le matériel au nombre de participants.',
            ],
        source: 'llm',
      };
    } catch {
      return this.buildFallbackRecommendation(prompt);
    }
  }

  private buildFallbackRecommendation(prompt: string): RecommendationResult {
    const normalized = prompt.toLowerCase();

    let recommendedItems: RecommendationItem[] = [
      {
        name: 'Eau et affaires personnelles',
        reason: 'Prévoir l’hydratation et les effets nécessaires à la durée de la séance.',
      },
    ];

    if (normalized.includes('foot') || normalized.includes('futsal')) {
      recommendedItems = [
        { name: 'Ballon adapté au terrain', reason: 'Indispensable pour le jeu et les exercices.' },
        { name: 'Chasubles', reason: 'Permettent de distinguer rapidement les équipes.' },
        { name: 'Plots ou cônes', reason: 'Utiles pour délimiter les zones et organiser les ateliers.' },
      ];
    } else if (normalized.includes('basket')) {
      recommendedItems = [
        { name: 'Ballon de basket', reason: 'Prévoir plusieurs ballons si des ateliers sont organisés.' },
        { name: 'Chasubles', reason: 'Pratiques pour les oppositions et les rotations.' },
        { name: 'Plots', reason: 'Utiles pour les parcours et la délimitation des ateliers.' },
      ];
    } else if (normalized.includes('badminton')) {
      recommendedItems = [
        { name: 'Raquettes', reason: 'Une raquette par joueur simplifie les rotations.' },
        { name: 'Volants', reason: 'Prévoir plusieurs volants pour éviter les interruptions.' },
        { name: 'Filet', reason: 'À vérifier si le lieu n’en met pas déjà un à disposition.' },
      ];
    } else if (normalized.includes('tennis')) {
      recommendedItems = [
        { name: 'Raquettes', reason: 'Une raquette adaptée par joueur.' },
        { name: 'Balles', reason: 'Prévoir plusieurs balles pour garder un rythme fluide.' },
      ];
    } else if (normalized.includes('volley')) {
      recommendedItems = [
        { name: 'Ballon de volley', reason: 'Choisir un ballon adapté au niveau du groupe.' },
        { name: 'Filet', reason: 'À vérifier selon l’équipement déjà présent sur le lieu.' },
      ];
    } else if (normalized.includes('handball')) {
      recommendedItems = [
        { name: 'Ballon de handball', reason: 'Choisir une taille adaptée au public.' },
        { name: 'Chasubles', reason: 'Utiles pour organiser les équipes.' },
        { name: 'Plots', reason: 'Pratiques pour les ateliers et les zones de travail.' },
      ];
    }

    return {
      activity: prompt,
      recommendedItems,
      explanation: 'Préparation générée localement à partir du sport détecté dans la demande.',
      optionalTips: [
        'Vérifier ce qui est déjà présent sur le lieu.',
        'Adapter les quantités au nombre de participants.',
        'Prévoir un échauffement et quelques minutes de rangement en fin de séance.',
      ],
      source: 'fallback',
    };
  }
}
