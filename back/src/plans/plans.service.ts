import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActivityPlan, ActivityPlanDocument } from '../schemas/activity-plan.schema';
import { CreatePlanDto } from './dto/create-plan.dto';

@Injectable()
export class PlansService {
  constructor(
    @InjectModel(ActivityPlan.name)
    private readonly planModel: Model<ActivityPlanDocument>,
  ) {}

  create(userId: string, dto: CreatePlanDto) {
    return this.planModel.create({
      ...dto,
      userId,
      equipment: dto.equipment.slice(0, 12),
      tips: dto.tips.slice(0, 12),
    });
  }

  findMine(userId: string) {
    return this.planModel.find({ userId }).sort({ createdAt: -1 });
  }

  async remove(id: string, userId: string) {
    const result = await this.planModel.findOneAndDelete({ _id: id, userId });
    if (!result) {
      throw new NotFoundException('Plan introuvable');
    }
    return { message: 'Plan supprimé' };
  }

  findAll() {
    return this.planModel.find().populate('userId', 'name email role').sort({ createdAt: -1 });
  }
}
