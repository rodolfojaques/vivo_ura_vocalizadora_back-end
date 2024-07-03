import { Request, Response } from "express"
import { AppError, handleError } from "../../error/appError"
import cargaMassivaDl from "../../services/cargas-massivas/cargaMassivaDL.service"

const cargaMassivaDLController = async (req:Request, res:Response) => {
    try {
        const cargaMassiva = await cargaMassivaDl(req)

        res.status(204).json(cargaMassiva)
        
    } catch (error) {
        if(error instanceof AppError){
            handleError(error, res)
        }
    }
}

export default cargaMassivaDLController