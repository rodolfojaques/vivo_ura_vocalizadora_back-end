import e from "express"
import { AlarmesHistoryTems } from "../../../src-temsHist/entities/alarmesTems.entity"
import { AppDataSourceTemsHistory } from "../../data-source"
import createAlarmesHistoryTemsService from "../alarmesHistoryTems/createAlarmesHistoryTems.service"
import vocalizacaoTemsService from "./vocalizacaoTems.service"

const awaitAndPersistenceSevice = async (data:any) => {
    const alarmeRepository = AppDataSourceTemsHistory.getRepository(AlarmesHistoryTems)

    const {
        identifier,
        matchedCounter,
        severity, 
        type,
        node,
    } = data

    if(!!data){
        const exists = await alarmeRepository.query(`
            SELECT * FROM alarmes_history_tems 
            WHERE $1::text = "identifier"
            AND $2::text = "node"
            AND $3::integer > 1
            AND "vocalizado" = false;
        `, [identifier, node, matchedCounter])

        const itsClear = await alarmeRepository.query(`
            SELECT * FROM alarmes_history_tems 
            WHERE $1::text = "identifier"
            AND $2::text = "node"
            AND $3::integer = 0
            AND $4::integer = 2
            AND "vocalizado" = false;
        `, [identifier, node, severity, type])

        if(exists.length === 0 && itsClear.length === 0 && data.severity !== 0, data.type !== 2){
            const newData:any = await createAlarmesHistoryTemsService(data)
            const timeout = (Number(newData.persistent_frontPersistence) * 1000) || (Number(newData.persistent_ttl) * 1000) || 600000            

            setTimeout(async() => {
                const dataExists = await alarmeRepository.findOneBy({id: newData.id})
                
                if(!!dataExists){
                    alarmeRepository.update(dataExists.id, {vocalizado: true})

                    const vocInit = await vocalizacaoTemsService({
                        origin: data,
                        alarmeCreated: dataExists
                    })

                    return vocInit
                }

                console.log("Alarme já foi solucionado ou não existe mais.") 
                return {
                    message: "Alarme já foi solucionado ou não existe mais.",
                    alarme: newData
                }
            }, timeout);

            console.log("Alarme criado e aguardando vocalização.")
            return {
                message: "Alarme criado e aguardando vocalização.",
                alarme: newData
            }
        }

        if(itsClear.length > 0){
            await alarmeRepository.query(`
                DELETE FROM alarmes_history_tems 
                WHERE $1::text = "identifier"
                AND $2::text = "node"
                AND "vocalizado" = false;
            `, [identifier, node])

            console.log("Clear recebido, alarme deletado.")
            return {message: "Clear recebido, alarme deletado."}
        }

        if(exists.length > 0){
            console.log("Alarme já existe e está aguardando vocalização.")
            return {message: "Alarme já existe e está aguardando vocalização."}
        }
        
    }

    console.log("Alarme com formato inválido para aplicação de regras de vocalização.")
    return {message: "Alarme com formato inválido para aplicação de regras de vocalização."}
}

export default awaitAndPersistenceSevice