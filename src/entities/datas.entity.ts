import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Usuarios } from "./usuarios.entity";

@Entity()
export class Datas {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({nullable: true})
  dia: Date;

  @Column({nullable: true})
  turno: string;

  @Column({nullable: true})
  dtInicio: Date;

  @Column({nullable: true})
  dtFim: Date;

  @ManyToOne(()=> Usuarios,(datas) => datas.datas, {onDelete: "SET NULL"})
  usuario: Usuarios;
}