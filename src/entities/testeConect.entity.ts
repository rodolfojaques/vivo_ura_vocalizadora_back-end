import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TesteConect {
    @PrimaryGeneratedColumn()
    readonly id: number

    @Column('text')
    viaCep: string
}