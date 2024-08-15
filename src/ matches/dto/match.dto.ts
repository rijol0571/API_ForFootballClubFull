import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateMatchDto {
  @IsString()
  @IsNotEmpty()
  readonly teamA: string;

  @IsString()
  @IsNotEmpty()
  readonly teamB: string;

  @IsDateString()
  @IsNotEmpty()
  readonly date: string;

  @IsString()
  @IsNotEmpty()
  readonly location: string;
}

export class UpdateMatchDto {
  @IsString()
  readonly teamA?: string;

  @IsString()
  readonly teamB?: string;

  @IsDateString()
  readonly date?: string;

  @IsString()
  readonly location?: string;
}
