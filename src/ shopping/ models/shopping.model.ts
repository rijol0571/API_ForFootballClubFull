import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Shopping {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  category: string;
}
