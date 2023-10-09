import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import listGruposAtuacaoService from "../../services/gruposAtuacao/listGruposAtuacao.service";

const listGruposAtuacaoController = async (req:Request,res:Response) => {
    try {
        const gruposAtuacao = await listGruposAtuacaoService()
        return res.json(gruposAtuacao)
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default listGruposAtuacaoController