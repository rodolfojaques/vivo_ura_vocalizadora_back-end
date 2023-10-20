import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Usuarios } from "./usuarios.entity";
import { GruposAlarmes } from "./gruposAlarmes.entity";

@Entity()
export class GruposAtuacao {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({nullable:true})
  nomeGrupo: string;

  @Column()
  gerente1: string;

  @Column()
  contato_ger1: string;

  @Column()
  gerente2: string;

  @Column()
  contato_ger2: string;

  @ManyToMany(()=> Usuarios, {eager:true})
  @JoinTable()
  usuarios: Usuarios[];

  @ManyToMany(()=> GruposAlarmes, {eager:true})
  @JoinTable()
  gruposAlarmes: GruposAlarmes[];
}