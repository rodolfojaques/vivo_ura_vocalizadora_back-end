import { AppDataSource } from "../../data-source";
import { GruposAlarmesTems } from "../../entities/gruposAlarmesTems.entity";
import { TipoAlarmeTems } from "../../entities/tipoAlarmeTems.entity";
import { AppError } from "../../error/appError";

const createTipoAlarmeTemsService = async (idGrupo: number, data: any) => {
  const tiposAlarmesRepository = AppDataSource.getRepository(TipoAlarmeTems);
  const gruposAlarmesRepository = AppDataSource.getRepository(GruposAlarmesTems);

  const grupo = await gruposAlarmesRepository.findOneBy({ id: idGrupo });
  if (!grupo) throw new AppError(400, "Grupo não encontrado!");

  const tipoAlarme = tiposAlarmesRepository.create({
    ...data,
    grupoAlarme: grupo,
  });
  await tiposAlarmesRepository.save(tipoAlarme);

  return tipoAlarme;
};

export default createTipoAlarmeTemsService;
