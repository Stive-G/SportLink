import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipment } from './create-equipment.dto';

export class UpdateEquipment extends PartialType(CreateEquipment) {}