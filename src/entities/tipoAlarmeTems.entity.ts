import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { GruposAlarmesTems } from "./gruposAlarmesTems.entity";

@Entity()
export class TipoAlarmeTems {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({nullable:true})
  estadoSigla: string;

  @Column({nullable:true})
  specificProblem: string;

  @Column({nullable:true})
  frontNetworkType: string;

  @Column({nullable:true})
  frontTypeTa: string;

  @Column({nullable:true})
  frontPlantType: string;

  @Column({nullable:true})
  frontTypeFailure: string;
  
  @Column()
  manager: string;

  @Column({nullable:true})
  familia: string;

  @Column({nullable:true})
  node: string;

  @Column({nullable:true})
  identifier: string;

  @Column({nullable:true})
  frontNodeReference: string;

  @Column({nullable:true})
  frontDomain: string;

  @Column({nullable:true})
  frontElementType: string;

  @Column({nullable:true})
  frontScriptProbe: string;
  
  @Column({nullable:true})
  frontAlarmId: string;

  @Column({nullable:true})
  frontPodName: string;

  @ManyToOne(()=> GruposAlarmesTems,(tipoAlarme) => tipoAlarme.tiposAlarmes, {onDelete: "SET NULL"})
  grupoAlarme: GruposAlarmesTems;
}