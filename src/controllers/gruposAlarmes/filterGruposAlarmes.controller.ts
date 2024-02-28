import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import { instanceToPlain } from "class-transformer";
import filterGruposAlarmesService from "../../services/gruposAlarmes/filterGruposAlarmes.service";

const filterGruposAlarmesController = async (req:Request,res:Response) => {
    try {
        const {value} = req.body
        const grupos = await filterGruposAlarmesService(value)

        return res.json(instanceToPlain(grupos))
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default filterGruposAlarmesController