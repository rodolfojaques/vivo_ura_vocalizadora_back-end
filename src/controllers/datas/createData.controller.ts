import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import createDataService from "../../services/datas/createData.service";

const createDataController = async (req:Request,res:Response) => {
    try {
        const data = req.body
        const { id } = req.usuario
        const newData = await createDataService(data,Number(id))

        return res.status(201).json(newData)        
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default createDataController