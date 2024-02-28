import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import { instanceToPlain } from "class-transformer";
import filterGruposAtuacaoTemsService from "../../services/gruposAtuacao/filterGruposAtuacaoTems.service";

const filterGruposAtuacaoTemsController = async (req:Request,res:Response) => {
    try {
        const {value} = req.body
        const gruposAtuacao = await filterGruposAtuacaoTemsService(value)
        return res.json(instanceToPlain(gruposAtuacao))
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default filterGruposAtuacaoTemsController