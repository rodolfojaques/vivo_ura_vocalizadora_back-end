import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { GruposAlarmes } from "./gruposAlarmes.entity";


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
export class TipoAlarme {
  @PrimaryGeneratedColumn()
  readonly id: number;
  
  @Column()
  tipoTA: string;

  @Column()
  estadoSigla: string;

  @Column()
  tipoPlanta: string;

  @Column()
  frontSpecificProblem: string;

  @Column()
  familia: string;

  @Column()
  tipoFalha: string;

  @Column()
  manager: string;


  @Column()
  severity: number;

  // @ManyToOne(()=> GruposAlarmes,(tipoAlarme) => tipoAlarme.tiposAlarmes, {onDelete: "SET NULL"})
  // grupoAlarme: GruposAlarmes;

  // CONTINUAR DO RELACIONAMENTO
}