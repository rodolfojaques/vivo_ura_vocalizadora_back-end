import { Request, Response } from "express"
import { AppError, handleError } from "../../error/appError"
import cargaMassivaSg from "../../services/cargas-massivas/cargaMassivaSG.service"

const cargaMassivaSGController = async (req:Request, res:Response) => {
    try {
        const cargaMassiva = await cargaMassivaSg(req)

        return res.status(204).json(cargaMassiva)
        
    } catch (error) {
        if(error instanceof AppError){
            handleError(error, res)
        }
    }
}

export default cargaMassivaSGController