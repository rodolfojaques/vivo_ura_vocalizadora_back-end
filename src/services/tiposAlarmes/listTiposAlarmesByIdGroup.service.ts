import AppDataSource from "../../data-source"
import { GruposAlarmes } from "../../entities/gruposAlarmes.entity"
import { AppError } from "../../error/appError"

const listTiposAlarmesByIdGroupService = async (idGrupo:number) => {
    const gruposAlarmesRepository = AppDataSource.getRepository(GruposAlarmes)

    const grupo = await gruposAlarmesRepository.findOneBy({id:idGrupo})
    if(!grupo) throw new AppError(400,"Grupo não encontrado!")

    return grupo.tiposAlarmes
}

export default listTiposAlarmesByIdGroupService