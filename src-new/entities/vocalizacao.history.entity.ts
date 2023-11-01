import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  OneToOne,
  AfterInsert,
  BeforeInsert,
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

  @Column({ nullable: true })
  code: number;

  @OneToOne((type) => AlarmesHistory, { eager: true })
  @JoinColumn()
  alarme: AlarmesHistory;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  data_criacao: Date;

  @Column({ default: false })
  status: boolean;
}
