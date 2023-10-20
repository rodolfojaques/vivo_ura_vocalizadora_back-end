import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import deleteTipoAlarmeByIdService from "../../services/tiposAlarmes/deleteTipoAlarmeById.service";

const deleteTipoAlarmeByIdController = async (req:Request,res:Response) => {
    try {
        const { id } = req.params
        
        await deleteTipoAlarmeByIdService(Number(id))

        return res.json({
            message: "Tipo de alarme excluído com sucesso!"
        })
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default deleteTipoAlarmeByIdController