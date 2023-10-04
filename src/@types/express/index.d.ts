import * as express from "express";

declare global {    
    namespace Express {
        interface Request {
            usuario: {
                id: number
                nome: string
                RE: string
                email: string
                tel_cel: string
                perfil: string                
            }
        }
    }
}