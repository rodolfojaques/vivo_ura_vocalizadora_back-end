import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { GruposAlarmesTems } from "./gruposAlarmesTems.entity";

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
  specificProblem: string;

  @Column({nullable:true})
  familia: string;

  @Column({nullable:true})
  tipoFalha: string;

  @Column({nullable:true})
  manager: string;

  @Column({nullable:true})
  severity: number;

  // @ManyToMany(()=> GruposAlarmesTems, {eager:true})
  // @JoinTable()
  // gruposAlarmesTems: GruposAlarmesTems[];
}