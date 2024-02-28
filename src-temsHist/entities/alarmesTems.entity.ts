import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { VocalizacaoHistoryTems } from "./vocalizacaoTems.history.entity";

@Entity()
export class AlarmesHistoryTems {
  @PrimaryGeneratedColumn()
  readonly id: number;  //AUTOINCREMENTAVEL

  @Column({ nullable: true })
  ESTADO: string;  //stateOrProvince

  @Column({ nullable: true })
  MUNICIPIO: string;  //cnlAcronym

  @Column({ nullable: true })
  LOCALIDADE: string;  //cnlAcronym

  @Column({ nullable: true })
  TIPO_ALARME: string;  //alarmTypeParent

  @Column({ nullable: true })
  TIPO_PLANTA: string;  //planType

  @Column({ nullable: true })
  CLASSIFICACAO: string;  //category

  @Column({ nullable: true })
  SITE: string;  //microarea

  @Column({ nullable: true })
  TIPO_REDE: string;  //networkType

  @Column({ nullable: true })
  TIPO_TA: string;  //type

  @Column({ nullable: true })
  TA: string;  //_id

  @Column("text",{nullable:true})
  DESCRICAO:string; //description

  @Column({nullable:true})  
  DATA_APRESENTACAO: Date; //presentationDate

  @Column({ nullable: true })
  SISTEMA_ORIGEM: string;  //originatingSystem

  @Column({ nullable: true })
  STATUS: string;  //status

  @OneToMany(()=> VocalizacaoHistoryTems, (vocHist)=> vocHist.alarme)
  vocsHist: VocalizacaoHistoryTems[]
}
