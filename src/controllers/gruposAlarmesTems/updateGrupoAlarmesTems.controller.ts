import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import { instanceToPlain } from "class-transformer";
import updateGrupoAlarmesTemsService from "../../services/gruposAlarmesTems/updateGrupoAlarmesTems.service";

const updateGrupoAlarmesTemsController = async (req:Request,res:Response) => {
    try {
        const { id } = req.params
        const data = req.body

        const grupo = await updateGrupoAlarmesTemsService(Number(id),data)

        return res.json(instanceToPlain(grupo))
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default updateGrupoAlarmesTemsController