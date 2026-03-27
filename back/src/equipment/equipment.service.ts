import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Equipment } from '../schemas/equipment.schema';
import { CreateEquipment } from './dto/create-equipment.dto';
import { UpdateEquipment } from './dto/update-equipment.dto';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectModel(Equipment.name)
    private readonly equipmentModel: Model<Equipment>,
  ) {}

  create(dto: CreateEquipment) {
    return this.equipmentModel.create({
      ...dto,
      available: dto.available ?? dto.quantity > 0,
    });
  }

  findAll(filters?: {
    sport?: string;
    available?: string;
    category?: string;
  }) {
    const query: FilterQuery<Equipment> = {};

    if (filters?.sport) {
      query.sport = filters.sport;
    }

    if (filters?.category) {
      query.category = filters.category;
    }

    if (filters?.available !== undefined) {
      query.available = filters.available === 'true';
    }

    return this.equipmentModel.find(query);
  }

  async findById(id: string) {
    const equipment = await this.equipmentModel.findById(id);

    if (!equipment) {
      throw new NotFoundException('Equipment not found');
    }

    return equipment;
  }

  async update(id: string, dto: UpdateEquipment) {
    const payload = { ...dto } as UpdateEquipment;

    // recalcule la disponibilite après modification.
    if (payload.quantity !== undefined && payload.available === undefined) {
      payload.available = payload.quantity > 0;
    }

    const equipment = await this.equipmentModel.findByIdAndUpdate(id, payload, {
      new: true,
    });

    if (!equipment) {
      throw new NotFoundException('Equipment not found');
    }

    return equipment;
  }

  async delete(id: string) {
    const equipment = await this.equipmentModel.findByIdAndDelete(id);

    if (!equipment) {
      throw new NotFoundException('Equipment not found');
    }

    return { message: 'Equipment deleted' };
  }
}
