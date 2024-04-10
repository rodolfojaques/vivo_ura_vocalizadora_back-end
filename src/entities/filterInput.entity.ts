import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { GruposAlarmesTems } from "./gruposAlarmesTems.entity";


/**
  - tipoRede		Ex: SERVICO_DE_DADOS
  - tipoTA		Ex: Plataforma
  - tipoPlanta		Ex: MOVEL
  - frontSpecificProblem	Ex: FALHA COMUNICACAO LINK  (sera um imput de txt?: SIM)
  - estadoSigla		Ex: AM
  - familia		Ex: PCFUMHUPC	
  - tipoFalha		Ex: Communications Alarm}
  - manager		Ex: U2020_HUAWEI_TAISHANCOREVIVO1
  - severity Ex: 1
*/

@Entity()
export class FilterInput {
  @PrimaryGeneratedColumn()
  readonly id: number;
  
  @Column({nullable:true})
  tipoTA: string;

  @Column({nullable:true})
  estadoSigla: string;

  @Column({nullable:true})
  tipoPlanta: string;

  @Column({nullable:true})
  frontSpecificProblem: string;

  @Column({nullable:true})
  familia: string;

  @Column({nullable:true})
  tipoFalha: string;

  @Column({nullable:true})
  manager: string;

  @Column({nullable:true})
  severity: number;
}