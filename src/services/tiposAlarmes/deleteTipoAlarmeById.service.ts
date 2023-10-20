import AppDataSource from "../../data-source"
import { TipoAlarme } from "../../entities/tipoAlarme.entity"
import { AppError } from "../../error/appError"

const deleteTipoAlarmeByIdService = async (id:number) => {
    const tiposAlarmesRepository = AppDataSource.getRepository(TipoAlarme)

    const tipoAlarme = await tiposAlarmesRepository.findOneBy({id:id})
    if(!tipoAlarme) throw new AppError(400,"Tipo de alarme não encontrado")

    await tiposAlarmesRepository.delete(id)

    return true
}

export default deleteTipoAlarmeByIdService