import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class PlanEquipmentDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  reason?: string;
}

export class CreatePlanDto {
  @IsString()
  @MaxLength(120)
  title: string;

  @IsString()
  @MaxLength(1200)
  activity: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  sport?: string;

  @IsOptional()
  @IsString()
  @MaxLength(180)
  placeName?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  peopleCount?: number;

  @IsOptional()
  @IsInt()
  @Min(15)
  durationMinutes?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlanEquipmentDto)
  equipment: PlanEquipmentDto[];

  @IsArray()
  @IsString({ each: true })
  tips: string[];

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  notes?: string;
}
