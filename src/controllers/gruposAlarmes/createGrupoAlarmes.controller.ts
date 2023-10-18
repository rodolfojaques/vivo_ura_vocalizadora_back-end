import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import createGrupoAlarmesService from "../../services/gruposAlarmes/createGrupoAlarmes.service";

const createGrupoAlarmesController = async (req:Request,res:Response) => {
    try {
        const data = req.body
        const grupo = await createGrupoAlarmesService(data)

        return res.status(201).json(grupo)
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default createGrupoAlarmesController