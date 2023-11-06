import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import listDataByUsuarioIdService from "../../services/datas/listDataByUsuarioId.service";
import { instanceToPlain } from "class-transformer";

const listDataByUsuarioIdController = async (req:Request,res:Response) => {
    try {
        const userId = req.params.id
        const datas = await listDataByUsuarioIdService(Number(userId))

        return res.json(instanceToPlain(datas))
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default listDataByUsuarioIdController