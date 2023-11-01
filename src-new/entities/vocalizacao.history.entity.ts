import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { AlarmesHistory } from "./alarmes.entity";

@Entity()
export class VocalizacaoHistory {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  contact_id: string;

  @Column()
  plantonista: string;

  @Column()
  phone: string;

  @Column()
  code: number;

  @OneToOne((type) => AlarmesHistory, { eager: true })
  @JoinColumn()
  alarme: AlarmesHistory;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  data_criacao: Date;

  @Column({ default: false })
  status: boolean;
}
