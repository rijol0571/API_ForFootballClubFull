import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateShoppingDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @Min(0)
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  readonly category: string;
}

export class UpdateShoppingDto {
  @IsString()
  readonly name?: string;

  @IsString()
  readonly description?: string;

  @IsNumber()
  @Min(0)
  readonly price?: number;

  @IsString()
  readonly category?: string;
}
