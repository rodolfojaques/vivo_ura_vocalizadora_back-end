import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import { instanceToPlain } from "class-transformer";
import listAllUsuariosInfraService from "../../services/usuarios/listAllUsuariosInfra.service";

const listAllUsuariosInfraController = async (req:Request,res:Response) => {
    try {
        const usuarios = await listAllUsuariosInfraService()
        
        return res.json(instanceToPlain(usuarios))  
    } catch (error) {
        if(error instanceof AppError){
            handleError(error,res)
        }
    }
}

export default listAllUsuariosInfraController