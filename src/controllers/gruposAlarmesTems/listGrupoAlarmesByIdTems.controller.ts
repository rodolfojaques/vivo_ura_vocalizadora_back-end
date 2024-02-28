import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import { instanceToPlain } from "class-transformer";
import listGruposAlarmesByIdTemsService from "../../services/gruposAlarmesTems/listGruposAlarmesByIdTems.service";

const listGruposAlarmesByIdTemsController = async (req:Request,res:Response) => {
    try {
        const { id } = req.params
        const grupo = await listGruposAlarmesByIdTemsService(Number(id))

        return res.json(instanceToPlain(grupo))
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default listGruposAlarmesByIdTemsController