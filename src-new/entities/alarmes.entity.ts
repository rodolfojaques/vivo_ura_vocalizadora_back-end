import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { VocalizacaoHistory } from "./vocalizacao.history.entity";

@Entity()
export class AlarmesHistory {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ nullable: true })
  ID_EVENTO: string;

  @Column({ nullable: true })
  ID_EQUIPAMENTO: number;

  @Column({ nullable: true })
  RPA_STATUS: number;

  @Column({ nullable: true })
  SIGITM_FLUXO: number;

  @Column({ nullable: true })
  TIPO_BILHETE: string;

  @Column({ nullable: true })
  TIPO_TA: string;

  @Column({ nullable: true })
  TIPO_REDE_COD: number;

  @Column({ nullable: true })
  TIPO_REDE_COD_INT: number;

  @Column({ nullable: true })
  TIPO_REDE: string;

  @Column({ nullable: true })
  ESTADO: string;

  @Column({ nullable: true })
  LOCALIDADE_COD: number;

  @Column({ nullable: true })
  MUNICIPIO: string;

  @Column({ nullable: true })
  LOCALIDADE: string;

  @Column({ nullable: true })
  ID_SITE: number;

  @Column({ nullable: true })
  SITE: string;

  @Column({ nullable: true })
  SEQUENCIA_ALARME: number;

  @Column({ nullable: true })
  EMPRESA_MANUTENCAO: string;

  @Column({ nullable: true })
  TIPO_ALARME: string;

  @Column({ nullable: true })
  CLASSIFICACAO: string;

  @Column("text", { nullable: true })
  ALARME: string;

  @Column({ nullable: true })
  TIPO_FALHA: string;

  @Column({ nullable: true })
  TIPO_AFETACAO: string;

  @Column({ nullable: true })
  EQUIPAMENTO: string;

  @Column({ nullable: true })
  TIPO_CORRENTE_ELETRICA: string;

  @Column({ nullable: true })
  CAPACIDADE: number;

  @Column({ nullable: true })
  DATA_APRESENTACAO: Date;

  @Column({ nullable: true })
  FABRICANTE: string;

  @Column({ nullable: true })
  MODELO: string;

  @Column({ nullable: true })
  SALAS_AFETADAS: number;

  @Column({ nullable: true })
  HISTORICO: string;

  @Column({ nullable: true })
  HISTORICO_TIPO: string;

  @Column({ nullable: true })
  TIPO_PLANTA: string;

  @Column({ nullable: true })
  TIPO_PLANTA_COD: number;

  @Column({ nullable: true })
  TA: number;

  @Column({ nullable: true })
  ELEMENTO_SIGLA: string;

  @OneToMany(()=> VocalizacaoHistory, (vocHist)=> vocHist.alarme)
  vocsHist: VocalizacaoHistory[]
}
