import { IsOptional, IsString } from 'class-validator';

export class CreateEquipment {
  @IsString()
  name: string;

  @IsString()
  sport: string;

  @IsString()
  category: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
