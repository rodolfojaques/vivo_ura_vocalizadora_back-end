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
} from "typeorm";
import { AlarmesHistory } from "./alarmes.entity";
import { AppDataSourceHistory } from "../../src/data-source";

@Entity()
export class VocalizacaoHistory {
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

  @ManyToOne(() => AlarmesHistory, (vocHist)=> vocHist.vocsHist, { eager: true })
  alarme: AlarmesHistory;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  data_criacao: Date;

  @Column({ default: false })
  status: boolean;
}
