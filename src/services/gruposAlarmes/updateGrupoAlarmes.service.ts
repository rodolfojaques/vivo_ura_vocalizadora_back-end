import AppDataSource from "../../data-source"
import { GruposAlarmes } from "../../entities/gruposAlarmes.entity"
import { GruposAtuacao } from "../../entities/gruposAtuacao.entity"
import { AppError } from "../../error/appError"

const updateGrupoAlarmesService = async (id:number,data:any) => {
    if(!!data.gruposAtuacao){

        const gruposAlarmesRepository = AppDataSource.getRepository(GruposAlarmes)
        const gruposAtuacaoRepository = AppDataSource.getRepository(GruposAtuacao)
    
        const grupoAlarmes = await gruposAlarmesRepository.findOneBy({id:id})
        if(!grupoAlarmes) throw new AppError(400,"Grupo não encontrado")
    
        const grupoAtuacao = await gruposAtuacaoRepository.findOneBy({id:data.gruposAtuacao})
        if(!grupoAtuacao) throw new AppError(400,"Grupo não encontrado")

        delete data?.id

        grupoAtuacao.gruposAlarmes = [...grupoAtuacao.gruposAlarmes,grupoAlarmes]        

        await gruposAtuacaoRepository.save(grupoAtuacao)

        delete data?.gruposAtuacao
        await gruposAlarmesRepository.update(id,{...data})

        const grupoUpdated = await gruposAlarmesRepository.findOneBy({id:id})       
    
        return grupoUpdated
    }

    const gruposAlarmesRepository = AppDataSource.getRepository(GruposAlarmes)
    
    const grupo = await gruposAlarmesRepository.findOneBy({id:id})
    if(!grupo) throw new AppError(400,"Grupo não encontrado")

    await gruposAlarmesRepository.update(id,{...data})
    const grupoReturned = await gruposAlarmesRepository.findOneBy({id:id})

    return grupoReturned
}

export default updateGrupoAlarmesService