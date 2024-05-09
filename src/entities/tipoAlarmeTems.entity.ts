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

  @Column({nullable:true})
  tipoDeAlarme: string;

  @Column({nullable:true})
  tipoRede: string;

  @Column({nullable:true})
  tipoTA: string;

  @Column({nullable:true})
  tipoPlanta: string;

  @Column({nullable:true})
  tipoFalha: string;
  
  @Column({nullable:true})
  manager: string;

  @ManyToOne(()=> GruposAlarmesTems,(tipoAlarme) => tipoAlarme.tiposAlarmes, {onDelete: "SET NULL"})
  grupoAlarme: GruposAlarmesTems;
}