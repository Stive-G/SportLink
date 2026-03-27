import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import OpenAI from 'openai';
import { EquipmentService } from '../equipment/equipment.service';

@Injectable()
export class AiService {
  private client: OpenAI;

  constructor(private readonly equipmentService: EquipmentService) {
    this.client = new OpenAI({
      apiKey: process.env.LITELLM_API_KEY || 'sk-placeholder',
      // baseURL pointe vers le proxy LiteLLM, pas vers OpenAI directement.
      baseURL: process.env.LITELLM_BASE_URL || 'http://localhost:4000',
    });
  }

  // on garde une reponse simple en texte pour que le front puisse l'afficher directement.
  async recommend(prompt: string): Promise<string> {
    const equipment = await this.equipmentService.findAll();
    const catalog = JSON.stringify(equipment, null, 2);

    try {
      const response = await this.client.chat.completions.create({
        // Correction: on cible le nom de modele declare au proxy LiteLLM.
        model: 'openai/gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              `Tu es un assistant expert en materiel sportif.
              Voici le catalogue de materiel disponible (format JSON) :${catalog}
              
              En fonction de la demande de l'utilisateur, recommande le materiel le plus adapte parmi ce catalogue. 
              Reponds en francais avec une liste claire et des explications courtes.`,
          },
          { role: 'user', content: prompt },
        ],
        max_tokens: 500,
      });

      return response.choices[0].message.content || '';
    } catch (error) {
      // Correction: on log l'erreur du proxy IA pour debug local sans masquer l'echec.
      console.error('AI recommendation error:', error);

      const message =
        error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();

      // Correction: on renvoie un message clair si le quota OpenAI est insuffisant.
      if (
        message.includes('insufficient_quota') ||
        message.includes('exceeded your current quota') ||
        message.includes('ratelimiterror') ||
        message.includes('429')
      ) {
        throw new ServiceUnavailableException(
          "IA indisponible pour le moment : quota OpenAI insuffisant ou limite atteinte.",
        );
      }

      throw new ServiceUnavailableException(
        "IA indisponible pour le moment : erreur de communication avec LiteLLM/OpenAI.",
      );
    }
  }
}
