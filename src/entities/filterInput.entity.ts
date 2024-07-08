import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class FilterInput {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({})
  estadoSigla: string;

  @Column({nullable:true})
  specificProblem: string;

  @Column({nullable:true})
  frontSpecificProblem: string;

  @Column({})
  manager: string;

  @Column({})
  classificacao: string;
}