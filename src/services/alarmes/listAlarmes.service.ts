import AppDataSource from "../../data-source"
import { Alarmes } from "../../entities/alarmes.entity"

const listAlarmesService = async () => {
    const alarmesRepository = AppDataSource.getRepository(Alarmes)
    const alarmes = await alarmesRepository.find()

    return alarmes
}

export default listAlarmesService