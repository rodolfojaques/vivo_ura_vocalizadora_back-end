import { AlarmesHistoryTems } from "../../../src-temsHist/entities/alarmesTems.entity"
import { AppDataSource } from "../../data-source"

const awaitAndPersistenceSevice = async (data:any) => {
    const alarmeRepository = AppDataSource.getRepository(AlarmesHistoryTems)

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

        if(exists.length === 0 && itsClear.length === 0){
            const newData:any = alarmeRepository.create(data)
            await alarmeRepository.save(newData)

            setTimeout(async() => {
                const dataExists = await alarmeRepository.findOneBy({id: newData.id})
                if(!!dataExists){
                    // constinuar do chamamento e ajustes do service de vocalização
                }
            }, 3000);
        }

        if(itsClear.length > 0){
            const deleteData = await alarmeRepository.query(`
                DELETE FROM alarmes_history_tems 
                WHERE $1::text = "identifier"
                AND "vocalizado" = false;
            `, [identifier])
        }
    }
}

export default awaitAndPersistenceSevice