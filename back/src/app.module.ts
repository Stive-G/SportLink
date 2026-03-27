import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AiModule } from './ai/ai.module';
import { EquipmentModule } from './equipment/equipment.module';
import { ReservationsModule } from './reservations/reservations.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // 1. Variables d'environnement (.env)
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2. Connexion MongoDB Atlas
    MongooseModule.forRoot(process.env.MONGODB_URI || ''),

    // 3. Modules fournis
    AuthModule,
    AiModule,
    UsersModule,
    EquipmentModule,    
    ReservationsModule, 
    
  ],
})
export class AppModule {}
