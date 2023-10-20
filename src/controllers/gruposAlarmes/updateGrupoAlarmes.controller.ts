import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import updateGrupoAlarmesService from "../../services/gruposAlarmes/updateGrupoAlarmes.service";

const updateGrupoAlarmesController = async (req:Request,res:Response) => {
    try {
        const { id } = req.params
        const data = req.body

        const grupo = await updateGrupoAlarmesService(Number(id),data)

        return res.json(grupo)
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default updateGrupoAlarmesController