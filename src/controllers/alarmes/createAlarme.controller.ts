import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import createAlarmeService from "../../services/alarmes/createAlarme.service";
import vocalizacaoService from "../../services/vocalizacao/grupoVocalizacao.service";
import chamadaVocalizacaoService from "../../services/vocalizacao/chamadaVocalizacao.service";

const createAlarmeController = async (req:Request,res:Response) => {
    try {
        const data = req.body
        const alarme = await createAlarmeService(data)

        if(!!alarme){
            const getGrupo = await vocalizacaoService(alarme)
            if(!!getGrupo) await chamadaVocalizacaoService(getGrupo)
        }

        return res.status(201).json(alarme)
    } catch (error) {
        if(error instanceof AppError) handleError(error,res)
    }
}

export default createAlarmeController