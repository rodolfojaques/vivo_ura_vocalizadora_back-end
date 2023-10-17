import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import deleteDataByIdService from "../../services/datas/deleteDataById.service";

const deleteDataByIdController = async (req:Request,res:Response) => {
    try {
        const {id} = req.params
        await deleteDataByIdService(Number(id))

        return res.json({message: "Data de plantão excluida com sucesso!"})
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default deleteDataByIdController