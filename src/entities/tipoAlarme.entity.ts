import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { GruposAlarmes } from "./gruposAlarmes.entity";


@Entity()
export class TipoAlarme {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  uf: string;

  @Column()
  site: string;

  @Column()
  tipoAlarme: string;

  @Column()
  classificacao: string;

  @Column()
  localidade: string;

  @Column()
  setor: string;

  @ManyToOne(()=> GruposAlarmes,(tipoAlarme) => tipoAlarme.tiposAlarmes)
  grupoAlarme: GruposAlarmes;
}