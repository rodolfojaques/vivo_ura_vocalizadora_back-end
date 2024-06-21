import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { GruposAlarmesTems } from "./gruposAlarmesTems.entity";

@Entity()
export class TipoAlarmeTems {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  estadoSigla: string;

  @Column({nullable:true})
  specificProblem: string;

  // @Column({nullable:true})
  // tipoDeAlarme: string;

  @Column({nullable:true})
  frontNetworkType: string;

  @Column({nullable:true})
  frontTypeTa: string;

  @Column({nullable:true})
  frontPlantType: string;

  @Column({nullable:true})
  frontTypeFailure: string;
  
  @Column({nullable:true})
  manager: string;

  @ManyToOne(()=> GruposAlarmesTems,(tipoAlarme) => tipoAlarme.tiposAlarmes, {onDelete: "SET NULL"})
  grupoAlarme: GruposAlarmesTems;
}