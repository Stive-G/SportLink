import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { RecommendationDto } from './dto/recommendation.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller()
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('recommendations')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('MEMBER')
  recommend(@Body() dto: RecommendationDto) {
    return this.aiService.recommend(dto.prompt);
  }
}
