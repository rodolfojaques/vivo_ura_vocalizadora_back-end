import { AppDataSource } from "../../data-source";
import { GruposAlarmes } from "../../entities/gruposAlarmes.entity";

const getOrCreateGrupoAlarmesService = async (data: any) => {
  const gruposAlarmesRepository = AppDataSource.getRepository(GruposAlarmes);

  
  const grupoAlreadyExists = await gruposAlarmesRepository.findOneBy({
    nomeGrupo: data.NOME_GRUPO,
  });

  if (!!grupoAlreadyExists)
    return grupoAlreadyExists;

  const grupo = gruposAlarmesRepository.create({ nomeGrupo: data.NOME_GRUPO});
  await gruposAlarmesRepository.save(grupo);

  return grupo; 

};

export default getOrCreateGrupoAlarmesService;
