import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import addGrupoAtuacaoService from "../../services/gruposAlarmes/addGrupoAtuacao.service";

const addGrupoAtuacaoController = async (req:Request,res:Response) => {
    try {
        const { id } = req.params
        const { gpAtuacaoId } = req.body

        const grupo = await addGrupoAtuacaoService(Number(id),Number(gpAtuacaoId))

        return res.json(grupo)
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default addGrupoAtuacaoController