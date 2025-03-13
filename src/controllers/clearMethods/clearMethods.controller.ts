import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import { deleteAlarmsDl, deleteAlarmsSg } from "../../utils/clearMethods";
import "dotenv/config"

export const deleteAlarmsSgController = async (req:Request,res:Response) => {
    try {
        const {days, auth} = req.body

        if(auth !== process.env.AUTH) return res.status(401).json({
            error: 'Unauthorized'
        })

        const result = await deleteAlarmsSg(days)

        console.log(result)

        return res.status(200).json({
            message: `${result.affected} linhas deletadas`
        })        
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export const deleteAlarmsDlController = async (req:Request,res:Response) => {
    try {
        const {days, auth} = req.body

        if(auth !== process.env.AUTH) return res.status(401).json({
            error: 'Unauthorized'
        })

        const result = await deleteAlarmsDl(days)

        console.log(result)

        return res.status(200).json({
            message: `${result.affected} linhas deletadas`
        })        
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}