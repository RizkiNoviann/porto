import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Experience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company: string;

  @Column()
  position: string;

  @Column()
  year: string;

  @Column()
  period: string;

  @Column({ type: 'text' })
  description: string;
}
