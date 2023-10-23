import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import addUsuarioService from "../../services/gruposAtuacao/addUsuario.service";

const addUsuarioController = async (req:Request,res:Response) => {
    try {
        const { id } = req.params
        const data = req.body

        const grupo = await addUsuarioService(Number(id),data)

        return res.json(grupo)
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default addUsuarioController