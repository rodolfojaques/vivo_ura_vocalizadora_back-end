import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import { instanceToPlain } from "class-transformer";
import listAllUsuariosTemsService from "../../services/usuarios/listAllUsuariosTems.service";

const listAllUsuariosTemsController = async (req:Request,res:Response) => {
    try {
        const usuarios = await listAllUsuariosTemsService()
        
        return res.json(instanceToPlain(usuarios))  
    } catch (error) {
        if(error instanceof AppError){
            handleError(error,res)
        }
    }
}

export default listAllUsuariosTemsController