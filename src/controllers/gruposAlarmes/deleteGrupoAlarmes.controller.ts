import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import deleteGrupoAlarmesService from "../../services/gruposAlarmes/deleteGrupoAlarmes.service";

const deleteGrupoAlarmesController = async (req:Request,res:Response) => {
    try {
        const { id } = req.params
        await deleteGrupoAlarmesService(Number(id))

        return res.json({
            message: "Grupo excluído com sucesso!"
        })
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default deleteGrupoAlarmesController