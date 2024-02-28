import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import { instanceToPlain } from "class-transformer";
import listGruposAlarmesTemsService from "../../services/gruposAlarmesTems/listGruposAlarmesTems.service";

const listGruposAlarmesTemsController = async (Req:Request,res:Response) => {
    try {
        const grupos = await listGruposAlarmesTemsService()

        return res.json(instanceToPlain(grupos))
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default listGruposAlarmesTemsController