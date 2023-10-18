import AppDataSource from "../../data-source"
import { GruposAlarmes } from "../../entities/gruposAlarmes.entity"
import { AppError } from "../../error/appError"

const createGrupoAlarmesService = async (data:any) => {
    const gruposAlarmesRepository = AppDataSource.getRepository(GruposAlarmes)

    const grupoAlreadyExists = await gruposAlarmesRepository.findOneBy({nomeGrupo:data.nomeGrupo})
    if(!!grupoAlreadyExists) throw new AppError(400,"Já existe um grupo com este nome")

    const grupo = gruposAlarmesRepository.create({...data})
    await gruposAlarmesRepository.save(grupo)

    return grupo
}

export default createGrupoAlarmesService