import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreatePlanDto } from './dto/create-plan.dto';
import { PlansService } from './plans.service';

@Controller('plans')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Post()
  @Roles('MEMBER')
  create(@Req() req: any, @Body() dto: CreatePlanDto) {
    return this.plansService.create(req.user.userId, dto);
  }

  @Get('me')
  @Roles('MEMBER')
  findMine(@Req() req: any) {
    return this.plansService.findMine(req.user.userId);
  }

  @Delete(':id')
  @Roles('MEMBER')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.plansService.remove(id, req.user.userId);
  }

  @Get()
  @Roles('ADMIN')
  findAll() {
    return this.plansService.findAll();
  }
}
