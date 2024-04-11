import { Request,Response } from "express";
import { AppError, handleError } from "../../error/appError";
import listFilterInputService from "../../services/tems-tools/listFilterInput.service";

const listFilterInputConstroller = async (req:Request, res:Response) => {
    try {
        const filters = await listFilterInputService()
        return res.json(filters)
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default listFilterInputConstroller