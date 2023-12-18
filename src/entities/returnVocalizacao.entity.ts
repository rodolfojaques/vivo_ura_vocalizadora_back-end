import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class ReturnVocalizacao {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  plantonista: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  code: string;

  @CreateDateColumn()
  createAt: Date
}
