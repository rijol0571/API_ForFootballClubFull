import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Trophy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: string;

  @Column()
  description: string;
}
