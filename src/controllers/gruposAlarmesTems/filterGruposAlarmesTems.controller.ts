import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import { instanceToPlain } from "class-transformer";
import filterGruposAlarmesTemsService from "../../services/gruposAlarmesTems/filterGruposAlarmesTems.service";

const filterGruposAlarmesTemsController = async (req:Request,res:Response) => {
    try {
        const {value} = req.body
        const grupos = await filterGruposAlarmesTemsService(value)

        return res.json(instanceToPlain(grupos))
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default filterGruposAlarmesTemsController