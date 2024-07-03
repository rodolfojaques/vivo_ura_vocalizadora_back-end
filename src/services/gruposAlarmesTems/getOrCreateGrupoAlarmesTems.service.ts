import { AppDataSource } from "../../data-source";
import { GruposAlarmesTems } from "../../entities/gruposAlarmesTems.entity";

const getOrCreateGrupoAlarmesTemsService = async (data: any) => {
  const gruposAlarmesRepository = AppDataSource.getRepository(GruposAlarmesTems);

  
  const grupoAlreadyExists = await gruposAlarmesRepository.findOneBy({
    nomeGrupo: data.NOME_GRUPO,
  });

  if (!!grupoAlreadyExists)
    return grupoAlreadyExists;

  const grupo = gruposAlarmesRepository.create({ nomeGrupo: data.NOME_GRUPO});
  await gruposAlarmesRepository.save(grupo);

  return grupo; 

};

export default getOrCreateGrupoAlarmesTemsService;
