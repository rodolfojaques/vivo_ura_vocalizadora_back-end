import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { GruposAlarmesTems } from "./gruposAlarmesTems.entity";

@Entity()
export class FilterInput {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({})
  estadoSigla: string;

  @Column({nullable:true})
  specificProblem: string;

  @Column({nullable:true})
  manager: string;

  @Column({default:1})
  severity: number;

  // @ManyToMany(()=> GruposAlarmesTems, {eager:true})
  // @JoinTable()
  // gruposAlarmesTems: GruposAlarmesTems[];
}