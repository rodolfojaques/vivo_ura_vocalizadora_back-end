import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import createGrupoAlarmesTemsService from "../../services/gruposAlarmesTems/createGrupoAlarmesTems.service";

const createGrupoAlarmesTemsController = async (req:Request,res:Response) => {
    try {
        const data = req.body
        const grupo = await createGrupoAlarmesTemsService(data)

        return res.status(201).json(grupo)
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default createGrupoAlarmesTemsController