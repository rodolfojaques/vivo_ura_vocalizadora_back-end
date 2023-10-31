import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class VocalizacaoHistory {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  vocalizacao_id: string;

  @Column()
  alarme_id: string;

  @Column()
  contact_id: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  data_criacao: Date;

  @Column()
  status: boolean;
}
