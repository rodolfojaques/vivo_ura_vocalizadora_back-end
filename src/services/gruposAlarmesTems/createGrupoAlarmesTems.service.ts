import { AppDataSource } from "../../data-source";
import { GruposAlarmesTems } from "../../entities/gruposAlarmesTems.entity";
import { AppError } from "../../error/appError";

const createGrupoAlarmesTemsService = async (data: any) => {
  const gruposAlarmesRepository = AppDataSource.getRepository(GruposAlarmesTems);

  const grupoAlreadyExists = await gruposAlarmesRepository.findOneBy({
    nomeGrupo: data.nomeGrupo,
  });
  if (!!grupoAlreadyExists)
    throw new AppError(400, "Já existe um grupo com este nome");

  const grupo = gruposAlarmesRepository.create({ ...data });
  await gruposAlarmesRepository.save(grupo);

  return grupo;
};

export default createGrupoAlarmesTemsService;
