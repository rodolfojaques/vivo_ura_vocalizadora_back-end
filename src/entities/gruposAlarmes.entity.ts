import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { TipoAlarme } from "./tipoAlarme.entity";
import { GruposAtuacao } from "./gruposAtuacao.entity";


@Entity()
export class GruposAlarmes {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({unique:true})
  nomeGrupo: string;

  @OneToMany(()=> TipoAlarme, (grupo)=> grupo.grupoAlarme, {eager:true})
  tiposAlarmes?: TipoAlarme[];

  @ManyToMany(()=> GruposAtuacao, {eager:true})
  @JoinTable()
  gruposAtuacao: GruposAtuacao[];
}