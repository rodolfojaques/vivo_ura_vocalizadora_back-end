import { NextFunction, Request, Response } from "express";

import { AppError } from "../error/appError";

const globalErrorMiddleware = async (error:Error, req:Request, res:Response, _:NextFunction) => {
    if(error instanceof AppError){
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error)

    return res.status(500).json({
        status: "error",
        message: "Internal server error"
    })
}

export default globalErrorMiddleware