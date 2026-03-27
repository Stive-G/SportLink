import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservation.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('reservations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @Roles('MEMBER')
  create(@Req() req: any, @Body() dto: CreateReservationDto) {
    return this.reservationsService.create(req.user.userId, dto);
  }

  @Get('me')
  @Roles('MEMBER')
  findMine(@Req() req: any) {
    return this.reservationsService.findMine(req.user.userId);
  }

  @Patch(':id/return')
  @Roles('MEMBER')
  returnReservation(@Param('id') id: string, @Req() req: any) {
    return this.reservationsService.returnReservation(id, req.user.userId);
  }

  @Get()
  @Roles('ADMIN')
  findAll() {
    return this.reservationsService.findAll();
  }
}
