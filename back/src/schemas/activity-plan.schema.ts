import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ActivityPlanDocument = HydratedDocument<ActivityPlan>;

@Schema({ timestamps: true })
export class ActivityPlan {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User', index: true })
  userId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  activity: string;

  @Prop({ trim: true })
  sport?: string;

  @Prop({ trim: true })
  placeName?: string;

  @Prop({ type: Number, min: 1 })
  peopleCount?: number;

  @Prop({ type: Number, min: 15 })
  durationMinutes?: number;

  @Prop({
    type: [
      {
        name: { type: String, required: true },
        reason: { type: String },
      },
    ],
    default: [],
  })
  equipment: { name: string; reason?: string }[];

  @Prop({ type: [String], default: [] })
  tips: string[];

  @Prop({ trim: true, maxlength: 2000 })
  notes?: string;
}

export const ActivityPlanSchema = SchemaFactory.createForClass(ActivityPlan);
