import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import { instanceToPlain } from "class-transformer";
import listGruposAtuacaoTemsService from "../../services/gruposAtuacao/listGruposAtuacaoTems.service";

const listGruposAtuacaoTemsController = async (req:Request,res:Response) => {
    try {
        const gruposAtuacao = await listGruposAtuacaoTemsService()
        return res.json(instanceToPlain(gruposAtuacao))
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default listGruposAtuacaoTemsController