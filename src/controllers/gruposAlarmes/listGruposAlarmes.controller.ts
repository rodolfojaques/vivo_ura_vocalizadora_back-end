import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import listGruposAlarmesService from "../../services/gruposAlarmes/listGruposAlarmes.service";
import { instanceToPlain } from "class-transformer";

const listGruposAlarmesController = async (Req:Request,res:Response) => {
    try {
        const grupos = await listGruposAlarmesService()

        return res.json(instanceToPlain(grupos))
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default listGruposAlarmesController