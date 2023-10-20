import AppDataSource from "../../data-source"
import { GruposAlarmes } from "../../entities/gruposAlarmes.entity"

const listGruposAlarmesService = async () => {
    const gruposAlarmesRepository = AppDataSource.getRepository(GruposAlarmes)

    return (await gruposAlarmesRepository.find())
}

export default listGruposAlarmesService