import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import { instanceToPlain } from "class-transformer";
import filterAllUsuariosService from "../../services/usuarios/filterAllUsuarios.service";

const filterAllUsuariosController = async (req:Request,res:Response) => {
    try {
        const {value} = req.body
        const usuarios = await filterAllUsuariosService(value)
        
        return res.json(instanceToPlain(usuarios))  
    } catch (error) {
        if(error instanceof AppError){
            handleError(error,res)
        }
    }
}

export default filterAllUsuariosController