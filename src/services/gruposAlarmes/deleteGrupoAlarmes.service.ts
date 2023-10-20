import AppDataSource from "../../data-source"
import { GruposAlarmes } from "../../entities/gruposAlarmes.entity"
import { AppError } from "../../error/appError"

const deleteGrupoAlarmesService = async (id:number) => {
    const gruposAlarmesRepository = AppDataSource.getRepository(GruposAlarmes)

    const grupoAlreadyExist = await gruposAlarmesRepository.findOneBy({id:id})
    if(!grupoAlreadyExist) throw new AppError(400,"Grupo não encontrado!")

    await gruposAlarmesRepository.delete(id)

    return true
}

export default deleteGrupoAlarmesService