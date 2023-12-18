import { AppDataSource } from "../data-source";
import { Alarmes } from "../entities/alarmes.entity";
import { ReturnVocalizacao } from "../entities/returnVocalizacao.entity";

const clearRoutine = async () => {
    const alarmesRepository = AppDataSource.getRepository(Alarmes)
    const returnVocalizacaoRepository = AppDataSource.getRepository(ReturnVocalizacao)

    const allAlarmes = await alarmesRepository.find()
    const allReturns = await returnVocalizacaoRepository.find()

    if(allAlarmes.length > 0){
        allAlarmes.forEach(async alarme => {
            const dt = new Date()
            const ontem = `${dt.getDate() - 1}-${dt.getMonth() + 1}-${dt.getFullYear()}`
            const hoje = `${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}`

            const dateDb = `${alarme.DATA_APRESENTACAO.getDate()}-${alarme.DATA_APRESENTACAO.getMonth() + 1}-${alarme.DATA_APRESENTACAO.getFullYear()}`

            if(hoje !== dateDb && ontem !== dateDb){
                await alarmesRepository.delete(alarme.id)
            }
        });        
    }

    if(allReturns.length > 0){
        allReturns.forEach(async retorno => {
            const dt = new Date()
            const hoje = `${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}`
            const hora = dt.getHours()

            const dateDb = `${retorno.createAt.getDate()}-${retorno.createAt.getMonth() + 1}-${retorno.createAt.getFullYear()}`
            const hrDb = retorno.createAt.getHours()

            if(hora - hrDb > 2 || hoje !== dateDb){
                await returnVocalizacaoRepository.delete(retorno.id)
            }
        });
    }
}

export default clearRoutine