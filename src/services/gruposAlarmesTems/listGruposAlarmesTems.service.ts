import { AppDataSource } from "../../data-source";
import { GruposAlarmesTems } from "../../entities/gruposAlarmesTems.entity";

const listGruposAlarmesTemsService = async () => {
  const gruposAlarmesRepository = AppDataSource.getRepository(GruposAlarmesTems);

  return await gruposAlarmesRepository.find();
};

export default listGruposAlarmesTemsService;
