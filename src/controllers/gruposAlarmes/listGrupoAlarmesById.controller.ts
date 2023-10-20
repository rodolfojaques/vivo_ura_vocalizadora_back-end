import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import listGruposAlarmesByIdService from "../../services/gruposAlarmes/listGruposAlarmesById.service";

const listGruposAlarmesByIdController = async (req:Request,res:Response) => {
    try {
        const { id } = req.params
        const grupo = await listGruposAlarmesByIdService(Number(id))

        return res.json(grupo)
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default listGruposAlarmesByIdController