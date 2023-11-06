import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import updateGrupoAlarmesService from "../../services/gruposAlarmes/updateGrupoAlarmes.service";
import { instanceToPlain } from "class-transformer";

const updateGrupoAlarmesController = async (req:Request,res:Response) => {
    try {
        const { id } = req.params
        const data = req.body

        const grupo = await updateGrupoAlarmesService(Number(id),data)

        return res.json(instanceToPlain(grupo))
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default updateGrupoAlarmesController