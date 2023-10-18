import AppDataSource from "../../data-source"
import { Alarmes } from "../../entities/alarmes.entity"

const createAlarmeService = async (data:any) => {
    const alarmesRepository = AppDataSource.getRepository(Alarmes)

    const alarme = alarmesRepository.create({...data})
    await alarmesRepository.save(alarme)

    return alarme
}

export default createAlarmeService