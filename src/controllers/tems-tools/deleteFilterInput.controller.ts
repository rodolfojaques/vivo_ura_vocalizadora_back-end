import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import deleteFilterInputService from "../../services/tems-tools/deleteFilterInput.service";

const deleteFilterInputController = async (req:Request,res:Response) => {
    try {
        const { id } = req.params
        await deleteFilterInputService(Number(id))

        return res.json({message: "Filter excluído com sucesso"})        
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default deleteFilterInputController