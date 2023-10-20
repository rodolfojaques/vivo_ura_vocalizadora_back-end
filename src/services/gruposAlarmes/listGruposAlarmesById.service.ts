import AppDataSource from "../../data-source"
import { GruposAlarmes } from "../../entities/gruposAlarmes.entity"
import { AppError } from "../../error/appError"

const listGruposAlarmesByIdService = async (id:number) => {
    const gruposAlarmesRepository = AppDataSource.getRepository(GruposAlarmes)
    
    const grupo = await gruposAlarmesRepository.findOneBy({id:id})
    if(!grupo) throw new AppError(400, "Grupo não encontrado!")

    return grupo
}

export default listGruposAlarmesByIdService