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

  @Column({nullable:true})
  manager: string;

  @Column({nullable:true})
  classificacao: string;
}