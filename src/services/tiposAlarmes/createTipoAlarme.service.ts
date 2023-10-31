import { AppDataSource } from "../../data-source";
import { GruposAlarmes } from "../../entities/gruposAlarmes.entity";
import { TipoAlarme } from "../../entities/tipoAlarme.entity";
import { AppError } from "../../error/appError";

const createTipoAlarmeService = async (idGrupo: number, data: any) => {
  const tiposAlarmesRepository = AppDataSource.getRepository(TipoAlarme);
  const gruposAlarmesRepository = AppDataSource.getRepository(GruposAlarmes);

  const grupo = await gruposAlarmesRepository.findOneBy({ id: idGrupo });
  if (!grupo) throw new AppError(400, "Grupo não encontrado!");

  const tipoAlarme = tiposAlarmesRepository.create({
    ...data,
    grupoAlarme: grupo,
  });
  await tiposAlarmesRepository.save(tipoAlarme);

  return tipoAlarme;
};

export default createTipoAlarmeService;
