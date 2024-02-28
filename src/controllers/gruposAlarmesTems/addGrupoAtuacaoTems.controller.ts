import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import { instanceToPlain } from "class-transformer";
import addGrupoAtuacaoTemsService from "../../services/gruposAlarmesTems/addGrupoAtuacaoTems.service";

const addGrupoAtuacaoTemsController = async (req:Request,res:Response) => {
    try {
        const { id } = req.params
        const { gpAtuacaoId } = req.body

        const grupo = await addGrupoAtuacaoTemsService(Number(id),Number(gpAtuacaoId))

        return res.json(instanceToPlain(grupo))
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default addGrupoAtuacaoTemsController