import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation, ReservationDocument } from '../schemas/reservation.schema';
import { EquipmentService } from '../equipment/equipment.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name)
    private readonly reservationModel: Model<ReservationDocument>,
    private readonly equipmentService: EquipmentService,
  ) {}

  async create(userId: string, dto: CreateReservationDto) {
    const equipment = await this.equipmentService.findById(dto.equipmentId);

    if (!equipment.available || equipment.quantity <= 0) {
      throw new BadRequestException('Equipment unavailable');
    }

    equipment.quantity -= 1;

    if (equipment.quantity === 0) {
      equipment.available = false;
    }

    await equipment.save();

    return this.reservationModel.create({
      userId,
      equipmentId: dto.equipmentId,
      startDate: dto.startDate,
      endDate: dto.endDate,
      status: 'ACTIVE',
    });
  }

  findAll() {
    return this.reservationModel
      .find()
      .populate('userId', '-password')
      .populate('equipmentId');
  }

  findMine(userId: string) {
    return this.reservationModel.find({ userId }).populate('equipmentId');
  }

  async returnReservation(id: string, userId: string) {
    const reservation = await this.reservationModel.findById(id);

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    // ForbiddenException est plus sémantique qu'un BadRequest pour un accès non autorisé
    if (reservation.userId.toString() !== userId) {
      throw new ForbiddenException('Unauthorized reservation access');
    }

    if (reservation.status === 'RETURNED') {
      throw new BadRequestException('Reservation already returned');
    }

    const equipment = await this.equipmentService.findById(
      reservation.equipmentId.toString(),
    );

    equipment.quantity += 1;
    equipment.available = true;
    await equipment.save();

    reservation.status = 'RETURNED';
    return reservation.save();
  }
}
