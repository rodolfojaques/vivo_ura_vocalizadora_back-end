import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import updateUsuarioService from "../../services/usuarios/updateUsuario.service";

const updateUsuarioController = async (req:Request,res:Response) => {
    try {
        const { id } = req.params
        const data = req.body

        const usuarioUpdated = await updateUsuarioService(Number(id),data)

        return res.json(usuarioUpdated)
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default updateUsuarioController