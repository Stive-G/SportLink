import { BadRequestException, Controller, Get, Header, Query } from '@nestjs/common';
import { PlacesService } from './places.service';

const ALLOWED_SPORTS = new Set([
  'football',
  'basket',
  'badminton',
  'handball',
  'volley',
  'tennis',
]);

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get()
  @Header('Cache-Control', 'no-store, max-age=0')
  search(@Query('location') location?: string, @Query('sport') sport?: string) {
    const cleanLocation = location?.trim() ?? '';
    if (cleanLocation.length < 2 || cleanLocation.length > 80) {
      throw new BadRequestException('Indique une ville ou un code postal valide.');
    }

    const normalizedSport = sport?.trim().toLowerCase();
    if (normalizedSport && normalizedSport !== 'all' && !ALLOWED_SPORTS.has(normalizedSport)) {
      throw new BadRequestException('Sport non pris en charge.');
    }

    return this.placesService.search(
      cleanLocation,
      normalizedSport && normalizedSport !== 'all' ? normalizedSport : undefined,
    );
  }
}
