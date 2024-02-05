import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { VocalizacaoHistoryTems } from "./vocalizacaoTems.history.entity";

@Entity()
export class AlarmesHistoryTems {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ nullable: true })
  ESTADO: string;

  @Column({ nullable: true })
  MUNICIPIO: string;

  @Column({ nullable: true })
  LOCALIDADE: string;

  @Column({ nullable: true })
  TIPO_ALARME: string;

  @Column({ nullable: true })
  CLASSIFICACAO: string;

  @Column("text", { nullable: true })
  ALARME: string;

  @Column({ nullable: true })
  DATA_APRESENTACAO: Date;

  @Column({ nullable: true })
  FABRICANTE: string;

  @Column({ nullable: true })
  MODELO: string;

  @Column({ nullable: true })
  TA: number;

  @OneToMany(()=> VocalizacaoHistoryTems, (vocHist)=> vocHist.alarme)
  vocsHist: VocalizacaoHistoryTems[]
}
