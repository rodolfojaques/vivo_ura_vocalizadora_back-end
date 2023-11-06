import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import deleteUsuarioService from "../../services/gruposAtuacao/deleteUsuario.service";
import { instanceToPlain } from "class-transformer";

const deleteUsuarioController = async (req:Request,res:Response) => {
    try {
        const { id } = req.params
        const { userId } = req.body

        const grupo = await deleteUsuarioService(Number(id),Number(userId))

        return res.json(instanceToPlain(grupo))
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default deleteUsuarioController