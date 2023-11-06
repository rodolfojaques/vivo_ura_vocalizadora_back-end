import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import updateUsuarioService from "../../services/usuarios/updateUsuario.service";
import { instanceToPlain } from "class-transformer";

const updateUsuarioController = async (req:Request,res:Response) => {
    try {
        const { id } = req.params
        const data = req.body

        const usuarioUpdated = await updateUsuarioService(Number(id),data)

        return res.json(instanceToPlain(usuarioUpdated))
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default updateUsuarioController