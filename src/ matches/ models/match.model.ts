import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Ticket } from '../../tickets/models/ticket.model';

@Entity()
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  teamA: string;

  @Column()
  teamB: string;

  @Column()
  date: string;

  @Column()
  location: string;

  @OneToMany(() => Ticket, (ticket) => ticket.match)
  tickets: Ticket[];
}

