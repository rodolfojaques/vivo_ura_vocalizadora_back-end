import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import deleteTipoAlarmeByIdTemsService from "../../services/tiposAlarmesTems/deleteTipoAlarmeByIdTems.service";

const deleteTipoAlarmeByIdTemsController = async (req:Request,res:Response) => {
    try {
        const { id } = req.params
        
        await deleteTipoAlarmeByIdTemsService(Number(id))

        return res.json({
            message: "Tipo de alarme excluído com sucesso!"
        })
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default deleteTipoAlarmeByIdTemsController