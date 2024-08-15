import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSponsorDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly description: string;
}

export class UpdateSponsorDto {
  @IsString()
  readonly name?: string;

  @IsString()
  readonly description?: string;
}

