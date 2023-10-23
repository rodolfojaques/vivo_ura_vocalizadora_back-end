import AppDataSource from "../../data-source"
import { GruposAlarmes } from "../../entities/gruposAlarmes.entity"
import { GruposAtuacao } from "../../entities/gruposAtuacao.entity"
import { AppError } from "../../error/appError"

const deleteGrupoAlarmeService = async (id:number,gpAlarmeId:number) => {
    const gruposAtuacaoRepository = AppDataSource.getRepository(GruposAtuacao)
    const gruposAlarmesRepository = AppDataSource.getRepository(GruposAlarmes)

    const grupoAlarme = await gruposAlarmesRepository.findOneBy({id:gpAlarmeId})
    if(!grupoAlarme) throw new AppError(400,"Grupo de Alarme não encontrado")

    const grupo = await gruposAtuacaoRepository.findOneBy({id:id})
    if(!grupo) throw new AppError(400,"Grupo não encontrado")

    const gruposAlarmesAtualizados = grupo.gruposAlarmes.filter(grp => grp.id !== grupoAlarme.id)
    grupo.gruposAlarmes = [...gruposAlarmesAtualizados ]        

    await gruposAtuacaoRepository.save(grupo) 
    
    const grupoUpdated = await gruposAtuacaoRepository.findOneBy({id:id})

    return grupoUpdated
}

export default deleteGrupoAlarmeService