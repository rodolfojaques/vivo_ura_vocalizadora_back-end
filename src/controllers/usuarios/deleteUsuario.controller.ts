import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import deleteUsuarioService from "../../services/usuarios/deleteUsuario.service";

const deleteUsuarioController = async (req:Request,res:Response) => {
    try {
        const { id } = req.params 
        const deleteUsuario = await deleteUsuarioService(Number(id))

        return res.json({message:"Usuário excluído com sucesso"})
    } catch (error) {
        if(error instanceof AppError){
            handleError(error,res)
        }
    }
}

export default deleteUsuarioController