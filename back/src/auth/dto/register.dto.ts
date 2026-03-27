import { IsEmail, IsOptional, IsString, MinLength, IsIn } from 'class-validator';

export class Register {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsIn(['ADMIN', 'MEMBER'])
  role?: string;
}