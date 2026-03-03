import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  tags: string; // JSON string array e.g. '["React","NestJS"]'

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  video: string;
}
