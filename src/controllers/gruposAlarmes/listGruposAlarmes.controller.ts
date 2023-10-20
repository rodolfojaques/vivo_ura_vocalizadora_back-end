import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import listGruposAlarmesService from "../../services/gruposAlarmes/listGruposAlarmes.service";

const listGruposAlarmesController = async (Req:Request,res:Response) => {
    try {
        const grupos = await listGruposAlarmesService()

        return res.json(grupos)
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default listGruposAlarmesController