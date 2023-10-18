import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import listAlarmesService from "../../services/alarmes/listAlarmes.service";

const listAlarmesController = async (req:Request,res:Response) => {
    try {
        const alarmes = await listAlarmesService()

        return res.json(alarmes)
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default listAlarmesController