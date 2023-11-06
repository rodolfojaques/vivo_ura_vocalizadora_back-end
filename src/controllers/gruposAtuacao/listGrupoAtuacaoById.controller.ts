import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import listGrupoAtuacaoByIdService from "../../services/gruposAtuacao/listGrupoAtuacaoById.service";
import { instanceToPlain } from "class-transformer";

const listGrupoAtuacaoByIdController = async (req:Request,res:Response) => {
    try {
        const { id } = req.params
        const grupo = await listGrupoAtuacaoByIdService(Number(id))

        return res.json(instanceToPlain(grupo))
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default listGrupoAtuacaoByIdController