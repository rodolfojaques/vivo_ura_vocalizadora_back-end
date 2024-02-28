import { Request, Response } from "express"
import { AppError, handleError } from "../../error/appError"
import listTiposAlarmesByIdGroupTemsService from "../../services/tiposAlarmesTems/listTiposAlarmesByIdGroupTems.service"

const listTiposAlarmesByIdGroupTemsController = async (req:Request,res:Response) => {
    try {
        const { idGrupo } = req.params

        const tiposAlarmes = await listTiposAlarmesByIdGroupTemsService(Number(idGrupo))

        return res.json(tiposAlarmes)
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default listTiposAlarmesByIdGroupTemsController