import { AppDataSource } from "../../data-source";
import { GruposAlarmesTems } from "../../entities/gruposAlarmesTems.entity";
import { AppError } from "../../error/appError";

const deleteGrupoAlarmesTemsService = async (id: number) => {
  const gruposAlarmesRepository = AppDataSource.getRepository(GruposAlarmesTems);

  const grupoAlreadyExist = await gruposAlarmesRepository.findOneBy({ id: id });
  if (!grupoAlreadyExist) throw new AppError(400, "Grupo não encontrado!");

  await gruposAlarmesRepository.delete(id);

  return true;
};

export default deleteGrupoAlarmesTemsService;
