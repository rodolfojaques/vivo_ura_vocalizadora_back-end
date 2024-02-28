import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import { instanceToPlain } from "class-transformer";
import deleteGrupoAtuacaoTemsService from "../../services/gruposAlarmesTems/deleteGrupoAtuacaoTems.service";

const deleteGrupoAtuacaoTemsController = async (req:Request,res:Response) => {
    try {
        const { id } = req.params
        const { gpAtuacaoId } = req.body

        const grupo = await deleteGrupoAtuacaoTemsService(Number(id),Number(gpAtuacaoId))

        return res.json(instanceToPlain(grupo))
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default deleteGrupoAtuacaoTemsController