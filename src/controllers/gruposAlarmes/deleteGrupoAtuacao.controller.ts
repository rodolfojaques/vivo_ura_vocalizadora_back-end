import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import deleteGrupoAtuacaoService from "../../services/gruposAlarmes/deleteGrupoAtuacao.service";

const deleteGrupoAtuacaoController = async (req:Request,res:Response) => {
    try {
        const { id } = req.params
        const { gpAtuacaoId } = req.body

        const grupo = await deleteGrupoAtuacaoService(Number(id),Number(gpAtuacaoId))

        return res.json(grupo)
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default deleteGrupoAtuacaoController