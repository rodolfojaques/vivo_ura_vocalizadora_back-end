import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { AlarmesHistoryTems } from "./alarmesTems.entity";

@Entity()
export class VocalizacaoHistoryTems {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  contact_id: number;

  @Column()
  plantonista: string;

  @Column()
  phone: string;

  @Column({ type: "bigint", unsigned: true, generated: "increment" })
  code: number;

  @ManyToOne(() => AlarmesHistoryTems, (vocHist)=> vocHist.vocsHist, {onDelete: "CASCADE", eager: true })
  alarme: AlarmesHistoryTems;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  status: boolean;
}
