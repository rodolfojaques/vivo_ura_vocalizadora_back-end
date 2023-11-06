import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import loginService from "../../services/login/login.service";
import { instanceToPlain } from "class-transformer";

const loginController = async (req:Request,res:Response) => {
    try {
        const data = req.body
        
        const session = await loginService(data)
        return res.json(instanceToPlain(session))        
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default loginController