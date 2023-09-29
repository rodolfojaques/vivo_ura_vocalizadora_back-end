import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Usuarios } from "./usuarios.entity";

@Entity()
export class GruposAtuacao {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  gerente1: string;

  @Column()
  contato_ger1: string;

  @Column()
  gerente2: string;

  @Column()
  contato_ger2: string;

  @OneToMany(()=> Usuarios, (usuarios)=> usuarios.grupoAtuacao, {eager:true})
  usuarios: Usuarios[];
}