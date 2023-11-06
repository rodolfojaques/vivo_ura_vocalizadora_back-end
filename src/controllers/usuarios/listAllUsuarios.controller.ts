import { Request, Response } from "express";
import listAllUsuariosService from "../../services/usuarios/listAllUsuarios.service";
import { AppError, handleError } from "../../error/appError";
import { instanceToPlain } from "class-transformer";

const listAllUsuariosController = async (req:Request,res:Response) => {
    try {
        const usuarios = await listAllUsuariosService()
        
        return res.json(instanceToPlain(usuarios))  
    } catch (error) {
        if(error instanceof AppError){
            handleError(error,res)
        }
    }
}

export default listAllUsuariosController