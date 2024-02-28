import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { GruposAtuacao } from "./gruposAtuacao.entity";
import { TipoAlarmeTems } from "./tipoAlarmeTems.entity";


@Entity()
export class GruposAlarmesTems {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({unique:true})
  nomeGrupo: string;

  @Column({default: 'DL'})
  typeTeam: string

  @OneToMany(()=> TipoAlarmeTems, (grupo)=> grupo.grupoAlarme, {eager:true})
  tiposAlarmes?: TipoAlarmeTems[];

  @ManyToMany(()=> GruposAtuacao, {eager:true})
  @JoinTable()
  gruposAtuacao: GruposAtuacao[];
}