import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @Min(1)
  @Max(99)
  readonly jerseyNumber: number;

  @IsString()
  @IsNotEmpty()
  readonly position: string;
}

export class UpdatePlayerDto {
  @IsString()
  readonly name?: string;

  @IsNumber()
  @Min(1)
  @Max(99)
  readonly jerseyNumber?: number;

  @IsString()
  readonly position?: string;
}
