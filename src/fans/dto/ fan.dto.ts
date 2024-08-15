// src/fans/dto/fan.dto.ts
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateFanDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class UpdateFanDto {
  @IsString()
  readonly name?: string;

  @IsEmail()
  readonly email?: string;

  @IsString()
  readonly password?: string;
}



