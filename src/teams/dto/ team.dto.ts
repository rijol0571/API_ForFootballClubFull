import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly city: string;
}

export class UpdateTeamDto {
  @IsString()
  readonly name?: string;

  @IsString()
  readonly city?: string;
}
