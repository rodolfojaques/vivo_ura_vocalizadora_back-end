import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import deleteGrupoAlarmesTemsService from "../../services/gruposAlarmesTems/deleteGrupoAlarmesTems.service";

const deleteGrupoAlarmesTemsController = async (req:Request,res:Response) => {
    try {
        const { id } = req.params
        await deleteGrupoAlarmesTemsService(Number(id))

        return res.json({
            message: "Grupo excluído com sucesso!"
        })
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default deleteGrupoAlarmesTemsController