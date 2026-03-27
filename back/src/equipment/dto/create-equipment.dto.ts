import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateEquipment {
  @IsString()
  name: string;

  @IsString()
  sport: string;

  @IsString()
  category: string;

  @IsInt()
  @Min(0)
  quantity: number;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsBoolean()
  available?: boolean;
}