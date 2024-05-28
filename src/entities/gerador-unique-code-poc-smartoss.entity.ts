import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GeradorUniqueCodePocSmartoss {
  @PrimaryGeneratedColumn()
  readonly id: number;
}