import { AppDataSource } from "../../data-source";
import { GruposAlarmesTems } from "../../entities/gruposAlarmesTems.entity";

const filterGruposAlarmesTemsService = async (value:string) => {
  const gruposAlarmesRepository = AppDataSource.getRepository(GruposAlarmesTems);
  const grupos = await gruposAlarmesRepository.find();

  const gruposSelec = grupos.filter(item => item.nomeGrupo.toLowerCase().includes(value.toLowerCase()))

  return gruposSelec
};

export default filterGruposAlarmesTemsService;
