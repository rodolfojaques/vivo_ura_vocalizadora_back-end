import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Exclude } from "class-transformer"
import { GruposAtuacao } from "./gruposAtuacao.entity"
import { Datas } from "./datas.entity"
import { hash, hashSync } from "bcrypt"

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

    @ManyToOne(()=> GruposAtuacao)
    grupoAtuacao?: GruposAtuacao;

    @OneToMany(()=> Datas, (datas)=> datas.usuario, {eager:true})
    datas?: Datas[];
}