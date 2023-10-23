import AppDataSource from "../../data-source"
import { GruposAlarmes } from "../../entities/gruposAlarmes.entity"
import { GruposAtuacao } from "../../entities/gruposAtuacao.entity"
import { AppError } from "../../error/appError"

const updateGrupoAlarmesService = async (id:number,data:any) => {
    const gruposAlarmesRepository = AppDataSource.getRepository(GruposAlarmes)
    
    const grupo = await gruposAlarmesRepository.findOneBy({id:id})
    if(!grupo) throw new AppError(400,"Grupo não encontrado")

    await gruposAlarmesRepository.update(id,{...data})
    const grupoReturned = await gruposAlarmesRepository.findOneBy({id:id})

    return grupoReturned
}

export default updateGrupoAlarmesService