import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import listUsuarioByIdService from "../../services/usuarios/listUsuarioById.service";

const listUsuarioByIdController = async (req:Request,res:Response) => {
    try {
        const { id } = req.params
        const usuario = await listUsuarioByIdService(Number(id))

        return res.json(usuario)
        
    } catch(error){
        if(error instanceof AppError)[
            handleError(error,res)
        ]
    }
}

export default listUsuarioByIdController