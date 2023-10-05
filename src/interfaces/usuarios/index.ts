export interface IUsuarioReq {
    nome: string
    RE: string
    email: string
    tel_cel: string
    perfil: string
}

export interface IUsuarioUpdate {
    id?: number
    nome?: string
    password?: string
    RE?: string
    email?: string
    tel_cel?: string
    perfil?: string
}

export interface IUsuarioLogin {
    RE: string
    password: string
}