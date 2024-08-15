import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTrophyDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly year: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}

export class UpdateTrophyDto {
  @IsString()
  readonly name?: string;

  @IsString()
  readonly year?: string;

  @IsString()
  readonly description?: string;
}
