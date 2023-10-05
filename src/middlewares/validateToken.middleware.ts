import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken"
import AppDataSource from "../data-source";
import { Usuarios } from "../entities/usuarios.entity";

const validateTokenMiddleware = async (req:Request,res:Response,next:NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]

    if(!!token && process.env.SECRET_KEY){
        jwt.verify(
            token, process.env.SECRET_KEY,async (error,decoded) => {
                if(!!error) return res.status(401).json({
                    message: "Invalid token!"
                })

                const usuarioId = decoded?.sub
                const usuariosRepository = AppDataSource.getRepository(Usuarios)
                const usuario = await usuariosRepository.findOneBy({id: Number(usuarioId)})

                req.usuario = usuario!

                return next()
            }
        )
    } else {
        return res.status(401).json({
            message: "É necessario ter autorização de token"
        })
    }
}

export default validateTokenMiddleware