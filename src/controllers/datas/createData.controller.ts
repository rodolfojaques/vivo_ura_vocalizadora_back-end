import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import createDataService from "../../services/datas/createData.service";
import { instanceToPlain } from "class-transformer";

const createDataController = async (req:Request,res:Response) => {
    try {
        const data = req.body
        const { id } = req.params
        const newData = await createDataService(data,Number(id))

        return res.status(201).json(instanceToPlain(newData))        
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default createDataController