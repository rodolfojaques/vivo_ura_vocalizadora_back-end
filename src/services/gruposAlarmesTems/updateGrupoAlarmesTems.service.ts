import { AppDataSource } from "../../data-source";
import { GruposAlarmesTems } from "../../entities/gruposAlarmesTems.entity";
import { AppError } from "../../error/appError";

const updateGrupoAlarmesTemsService = async (id: number, data: any) => {
  const gruposAlarmesRepository = AppDataSource.getRepository(GruposAlarmesTems);

  const grupo = await gruposAlarmesRepository.findOneBy({ id: id });
  if (!grupo) throw new AppError(400, "Grupo não encontrado");

  await gruposAlarmesRepository.update(id, { ...data });
  const grupoReturned = await gruposAlarmesRepository.findOneBy({ id: id });

  return grupoReturned;
};

export default updateGrupoAlarmesTemsService;
