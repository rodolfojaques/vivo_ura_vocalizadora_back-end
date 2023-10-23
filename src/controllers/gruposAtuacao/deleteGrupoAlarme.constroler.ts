import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import deleteGrupoAlarmeService from "../../services/gruposAtuacao/deleteGrupoAlarme.service";

const deleteGrupoAlarmeController = async (req:Request,res:Response) => {
    try {
        const { id } = req.params
        const { gpAlarmeId } = req.body

        const grupo = await deleteGrupoAlarmeService(Number(id),Number(gpAlarmeId))

        return res.json(grupo)
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default deleteGrupoAlarmeController