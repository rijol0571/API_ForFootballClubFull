import { IsString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  readonly productId: string;

  @IsUUID()
  @IsNotEmpty()
  readonly fanId: string;

  @IsNumber()
  readonly quantity: number;

  @IsString()
  @IsNotEmpty()
  readonly status: string;
}

export class UpdateOrderDto {
  @IsUUID()
  readonly productId?: string;

  @IsUUID()
  readonly fanId?: string;

  @IsNumber()
  readonly quantity?: number;

  @IsString()
  readonly status?: string;
}
