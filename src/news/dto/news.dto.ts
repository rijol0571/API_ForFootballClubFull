import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;
}

export class UpdateNewsDto {
  @IsString()
  readonly title?: string;

  @IsString()
  readonly content?: string;
}
