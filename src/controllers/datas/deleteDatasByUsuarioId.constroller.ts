import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import deleteDatasByUsuarioIdService from "../../services/datas/deleteDatasByUsuarioId.service";

const deleteDatasByUsuarioIdController = async (req:Request,res:Response) => {
    try {
        const {id} = req.params
        await deleteDatasByUsuarioIdService(Number(id))  
        
        return res.json({message: "Datas de plantão excluídas"})
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default deleteDatasByUsuarioIdController