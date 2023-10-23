import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import addGrupoAlarmeService from "../../services/gruposAtuacao/addGrupoAlarme.service";

const addGrupoAlarmeController = async (req:Request,res:Response) => {
    try {
        const { id } = req.params
        const { gpAlarmeId } = req.body

        const grupo = await addGrupoAlarmeService(Number(id),Number(gpAlarmeId))

        return res.json(grupo)
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default addGrupoAlarmeController