import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import deleteGrupoAtuacaoByIdService from "../../services/gruposAtuacao/deleteGrupoAtuacaoById.service";

const deleteGrupoAtuacaoByIdController = async (req:Request,res:Response) => {
    try {
        const { id } = req.params
        await deleteGrupoAtuacaoByIdService(Number(id))
        
        return res.json({message: "Grupo excluído com sucesso"})
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default deleteGrupoAtuacaoByIdController