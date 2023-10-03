import { Request, Response } from "express"
import { AppError, handleError } from "../../error/appError"
import createUsuarioService from "../../services/usuarios/createUsuarioService.service"


const createUsuarioController = async (req:Request,res:Response) => {
    try {
        const usuarioData = req.body
        const newUsuario = await createUsuarioService(usuarioData)

        return res.status(201).json(newUsuario)

    } catch (error) {
        if(error instanceof AppError){
            handleError(error,res)
        }        
    }
}

export default createUsuarioController