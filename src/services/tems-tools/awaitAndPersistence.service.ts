import { AlarmesHistoryTems } from "../../../src-temsHist/entities/alarmesTems.entity"
import { AppDataSourceTemsHistory } from "../../data-source"
import createAlarmesHistoryTemsService from "../alarmesHistoryTems/createAlarmesHistoryTems.service"
import vocalizacaoTemsService from "./vocalizacaoTems.service"

const awaitAndPersistenceSevice = async (data:any) => {
    const alarmeRepository = AppDataSourceTemsHistory.getRepository(AlarmesHistoryTems)

    const {
        identifier,
        matchedCounter,
        severity
    } = data

    if(!!data){
        const exists = await alarmeRepository.query(`
            SELECT * FROM alarmes_history_tems 
            WHERE $1::text = "identifier"
            AND $2::integer > 1
            AND "vocalizado" = false;
        `, [identifier, matchedCounter])

        const itsClear = await alarmeRepository.query(`
            SELECT * FROM alarmes_history_tems 
            WHERE $1::text = "identifier"
            AND $2::integer = 0
            AND "vocalizado" = false;
        `, [identifier, severity])

        if(exists.length === 0 && itsClear.length === 0 && data.severity !== 0){
            const newData:any = await createAlarmesHistoryTemsService(data)

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
                return {message: "Alarme já foi solucionado ou não existe mais."}

            }, 15000);

            console.log("Alarme criado e aguardando vocalização.")
            return {message: "Alarme criado e aguardando vocalização."}
        }

        if(itsClear.length > 0){
            await alarmeRepository.query(`
                DELETE FROM alarmes_history_tems 
                WHERE $1::text = "identifier"
                AND "vocalizado" = false;
            `, [identifier])

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