import { AppDataSource } from "../../data-source";
import { GruposAlarmes } from "../../entities/gruposAlarmes.entity";

const filterGruposAlarmesService = async (value:string) => {
  const gruposAlarmesRepository = AppDataSource.getRepository(GruposAlarmes);
  const grupos = await gruposAlarmesRepository.find();

  if(value === null) return grupos

  const gruposSelec = grupos.filter(item => item.nomeGrupo.toLowerCase().includes(value.toLowerCase()))

  return gruposSelec
};

export default filterGruposAlarmesService;
