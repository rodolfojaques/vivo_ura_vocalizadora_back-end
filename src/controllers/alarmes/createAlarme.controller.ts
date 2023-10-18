import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import createAlarmeService from "../../services/alarmes/createAlarme.service";

const createAlarmeController = async (req:Request,res:Response) => {
    try {
        const data = req.body
        const alarme = await createAlarmeService(data)

        return res.status(201).json(alarme)
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default createAlarmeController