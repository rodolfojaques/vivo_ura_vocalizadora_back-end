import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import createFilterInputService from "../../services/tems-tools/createFilterInput.service";

const createFilterInputController = async (req:Request,res:Response) => {
    try {
        const data = req.body
        const filter = await createFilterInputService(data)

        return res.json(filter)
        
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }    
}

export default createFilterInputController