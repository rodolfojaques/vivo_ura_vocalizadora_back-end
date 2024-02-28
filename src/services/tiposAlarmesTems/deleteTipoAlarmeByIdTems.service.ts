import { AppDataSource } from "../../data-source";
import { TipoAlarmeTems } from "../../entities/tipoAlarmeTems.entity";
import { AppError } from "../../error/appError";

const deleteTipoAlarmeByIdTemsService = async (id: number) => {
  const tiposAlarmesRepository = AppDataSource.getRepository(TipoAlarmeTems);

  const tipoAlarme = await tiposAlarmesRepository.findOneBy({ id: id });
  if (!tipoAlarme) throw new AppError(400, "Tipo de alarme não encontrado");

  await tiposAlarmesRepository.delete(id);

  return true;
};

export default deleteTipoAlarmeByIdTemsService;
