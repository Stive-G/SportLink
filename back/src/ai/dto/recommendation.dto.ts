import { IsString } from 'class-validator';

export class RecommendationDto {
  @IsString()
  prompt: string;
}