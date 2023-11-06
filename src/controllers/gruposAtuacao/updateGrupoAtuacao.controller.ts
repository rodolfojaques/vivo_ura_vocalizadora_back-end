import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import updateGrupoAtuacaoService from "../../services/gruposAtuacao/updateGrupoAtuacao.service";
import { instanceToPlain } from "class-transformer";

const updateGrupoAtuacaoController = async (req:Request,res:Response) => {
    try {
        const { id } = req.params
        const data = req.body

        const grupo = await updateGrupoAtuacaoService(Number(id),data)

        return res.json(instanceToPlain(grupo))
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default updateGrupoAtuacaoController