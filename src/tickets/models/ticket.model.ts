import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Match } from "../../ matches/ models/match.model"

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: number;

  @Column()
  seatNumber: string;

  @ManyToOne(() => Match, (match) => match.tickets, { onDelete: 'CASCADE' })
  match: Match;
}




