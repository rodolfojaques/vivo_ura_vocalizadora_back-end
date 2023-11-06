import { Request, Response } from "express"
import { AppError, handleError } from "../../error/appError"
import createUsuarioService from "../../services/usuarios/createUsuarioService.service"
import { instanceToPlain } from "class-transformer"


const createUsuarioController = async (req:Request,res:Response) => {
    try {
        const usuarioData = req.body
        const newUsuario = await createUsuarioService(usuarioData)

        return res.status(201).json(instanceToPlain(newUsuario))

    } catch (error) {
        if(error instanceof AppError){
            handleError(error,res)
        }        
    }
}

export default createUsuarioController