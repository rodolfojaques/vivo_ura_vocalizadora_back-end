import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  OneToOne,
  AfterInsert,
  BeforeInsert,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { AppDataSourceHistory } from "../../src/data-source";
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

  @ManyToOne(() => AlarmesHistoryTems, (vocHist)=> vocHist.vocsHist, { eager: true })
  alarme: AlarmesHistoryTems;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  status: boolean;
}
