import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import createTipoAlarmeService from "../../services/tiposAlarmes/createTipoAlarme.service";

const createTipoAlarmeController = async (req:Request,res:Response) => {
    try {
        const { idGrupo } = req.params
        const data = req.body
        const tipoAlarme = await createTipoAlarmeService(Number(idGrupo),data)

        return res.status(201).json(tipoAlarme)
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default createTipoAlarmeController