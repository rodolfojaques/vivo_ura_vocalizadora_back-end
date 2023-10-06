import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Usuarios } from "./usuarios.entity";

@Entity()
export class Datas {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  dia: Date;

  @Column()
  turno: string;

  @ManyToOne(()=> Usuarios,(datas) => datas.datas)
  usuario: Usuarios;
}