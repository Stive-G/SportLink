import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema({ timestamps: true })
export class Reservation {
  // Types.ObjectId assure la compatibilité avec les ObjectId MongoDB
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Equipment' })
  equipmentId: Types.ObjectId;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({
    required: true,
    enum: ['PENDING', 'ACTIVE', 'RETURNED'],
    default: 'ACTIVE',
  })
  status: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
