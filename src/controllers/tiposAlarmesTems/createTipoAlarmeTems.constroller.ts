import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import { instanceToPlain } from "class-transformer";
import createTipoAlarmeTemsService from "../../services/tiposAlarmesTems/createTipoAlarmeTems.service";

const createTipoAlarmeTemsController = async (req:Request,res:Response) => {
    try {
        const { idGrupo } = req.params
        const data = req.body
        const tipoAlarme = await createTipoAlarmeTemsService(Number(idGrupo),data)

        return res.status(201).json(instanceToPlain(tipoAlarme))
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default createTipoAlarmeTemsController