import { Request, Response } from "express"
import { AppError, handleError } from "../../error/appError"
import listTiposAlarmesByIdGroupService from "../../services/tiposAlarmes/listTiposAlarmesByIdGroup.service"

const listTiposAlarmesByIdGroupController = async (req:Request,res:Response) => {
    try {
        const { idGrupo } = req.params

        const tiposAlarmes = await listTiposAlarmesByIdGroupService(Number(idGrupo))

        return res.json(tiposAlarmes)
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default listTiposAlarmesByIdGroupController