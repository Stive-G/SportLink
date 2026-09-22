import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Equipment {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  sport: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  imageUrl?: string;
}

export const EquipmentSchema = SchemaFactory.createForClass(Equipment);