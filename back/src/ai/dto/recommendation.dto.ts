import { IsNotEmpty, IsString } from 'class-validator';

export class RecommendationDto {
  @IsString()
  @IsNotEmpty()
  prompt: string;
}
