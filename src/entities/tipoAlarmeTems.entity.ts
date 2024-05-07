import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { GruposAlarmesTems } from "./gruposAlarmesTems.entity";


@Entity()
export class TipoAlarmeTems {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  estadoSigla: string;

  @Column()
  specificProblem: string;

  @Column()
  tipoDeAlarme: string;

  @Column()
  tipoRede: string;

  @Column()
  tipoTA: string;

  @Column()
  tipoPlanta: string;

  @Column()
  tipoFalha: string;
  
  @Column()
  manager: string;

  @ManyToOne(()=> GruposAlarmesTems,(tipoAlarme) => tipoAlarme.tiposAlarmes, {onDelete: "SET NULL"})
  grupoAlarme: GruposAlarmesTems;
}