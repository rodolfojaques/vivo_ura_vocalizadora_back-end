import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import { instanceToPlain } from "class-transformer";
import filterGruposAtuacaoService from "../../services/gruposAtuacao/filterGruposAtuacao.service";

const filterGruposAtuacaoController = async (req:Request,res:Response) => {
    try {
        const {value} = req.body
        const gruposAtuacao = await filterGruposAtuacaoService(value)
        return res.json(instanceToPlain(gruposAtuacao))
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default filterGruposAtuacaoController