import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  readonly matchId: string;

  @IsNumber()
  @Min(0)
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  readonly seatNumber: string;
}

export class UpdateTicketDto {
  @IsNumber()
  @Min(0)
  readonly price?: number;

  @IsString()
  readonly seatNumber?: string;
}
