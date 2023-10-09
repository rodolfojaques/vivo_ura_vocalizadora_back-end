import { Request, Response } from "express";
import createGruposDeAtuacaoService from "../../services/gruposAtuacao/createGruposDeAtuacao.service";
import { AppError, handleError } from "../../error/appError";

const createGruposDeAtuacaoController = async (req:Request,res:Response) => {
    try {
        const data = req.body
        const grupoDeAtuacao = await createGruposDeAtuacaoService(data)

        return res.status(201).json(grupoDeAtuacao)        
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default createGruposDeAtuacaoController