import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './roles.guard';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // Correction: on lit le secret JWT via ConfigService pour que le meme secret serve au sign et au verify.
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'dev-secret-change-me',
        signOptions: { expiresIn: '24h' },
      }),
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    // Correction: on enregistre RolesGuard pour que Reflector soit injecte proprement.
    RolesGuard,
  ],
  // Correction: RolesGuard est exporte pour etre reutilisable dans les modules metier.
  exports: [JwtStrategy, PassportModule, RolesGuard],
})
export class AuthModule {}
