import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from '../schemas/reservation.schema';
import { ReservationsService } from './reservation.service';
import { ReservationsController } from './reservations.controller';
import { EquipmentModule } from '../equipment/equipment.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
    EquipmentModule,
  ],
  providers: [ReservationsService],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
