import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import listGruposAlarmesByIdService from "../../services/gruposAlarmes/listGruposAlarmesById.service";
import { instanceToPlain } from "class-transformer";

const listGruposAlarmesByIdController = async (req:Request,res:Response) => {
    try {
        const { id } = req.params
        const grupo = await listGruposAlarmesByIdService(Number(id))

        return res.json(instanceToPlain(grupo))
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default listGruposAlarmesByIdController