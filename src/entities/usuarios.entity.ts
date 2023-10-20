import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

import { GruposAtuacao } from "./gruposAtuacao.entity"
import { Datas } from "./datas.entity"
import { hashSync } from "bcrypt"

@Entity()
export class Usuarios {
    @PrimaryGeneratedColumn()
    readonly id: number

    @Column()
    nome: string
    
    @Column({default:hashSync("12345",10)})
    password?: string

    @Column({unique: true})
    RE: string

    @Column({unique: true})
    email: string
    
    @Column()
    tel_cel: string

    @Column()
    perfil: string

    @OneToMany(()=> Datas, (datas)=> datas.usuario, {eager:true})
    datas?: Datas[];
}