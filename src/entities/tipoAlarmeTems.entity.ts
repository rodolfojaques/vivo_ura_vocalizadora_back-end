import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { GruposAlarmesTems } from "./gruposAlarmesTems.entity";


@Entity()
export class TipoAlarmeTems {
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
  tipoPlanta: string;

  @ManyToOne(()=> GruposAlarmesTems,(tipoAlarme) => tipoAlarme.tiposAlarmes, {onDelete: "SET NULL"})
  grupoAlarme: GruposAlarmesTems;
}