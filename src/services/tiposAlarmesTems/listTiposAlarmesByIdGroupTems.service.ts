import { AppDataSource } from "../../data-source";
import { GruposAlarmesTems } from "../../entities/gruposAlarmesTems.entity";
import { AppError } from "../../error/appError";

const listTiposAlarmesByIdGroupTemsService = async (idGrupo: number) => {
  const gruposAlarmesRepository = AppDataSource.getRepository(GruposAlarmesTems);

  const grupo = await gruposAlarmesRepository.findOneBy({ id: idGrupo });
  if (!grupo) throw new AppError(400, "Grupo não encontrado!");

  return grupo.tiposAlarmes;
};

export default listTiposAlarmesByIdGroupTemsService;
