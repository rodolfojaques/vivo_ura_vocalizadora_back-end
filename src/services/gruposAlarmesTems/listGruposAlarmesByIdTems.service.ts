import { AppDataSource } from "../../data-source";
import { GruposAlarmesTems } from "../../entities/gruposAlarmesTems.entity";
import { AppError } from "../../error/appError";

const listGruposAlarmesByIdTemsService = async (id: number) => {
  const gruposAlarmesRepository = AppDataSource.getRepository(GruposAlarmesTems);

  const grupo = await gruposAlarmesRepository.findOneBy({ id: id });
  if (!grupo) throw new AppError(400, "Grupo não encontrado!");

  return grupo;
};

export default listGruposAlarmesByIdTemsService;
