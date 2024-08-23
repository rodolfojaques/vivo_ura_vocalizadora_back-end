import { AppDataSource } from "../../data-source";
import { GruposAlarmesTems } from "../../entities/gruposAlarmesTems.entity";
import { TipoAlarmeTems } from "../../entities/tipoAlarmeTems.entity";
import { AppError } from "../../error/appError";

const createTipoAlarmeTemsService = async (idGrupo: number, data: any) => {
  const tiposAlarmesRepository = AppDataSource.getRepository(TipoAlarmeTems);
  const gruposAlarmesRepository = AppDataSource.getRepository(GruposAlarmesTems);

  const grupo = await gruposAlarmesRepository.findOneBy({ id: idGrupo });
  if (!grupo) throw new AppError(400, "Grupo não encontrado!");

  if(!!data.frontTypeTa){
    data.frontTypeTa = data.frontTypeTa.replaceAll('Gerência', 'Gerencia').replaceAll('Comutação', 'Comutacao');
  }

  const tipoAlarme = tiposAlarmesRepository.create({
    ...data,
    grupoAlarme: grupo,
  });
  
  try {
    await tiposAlarmesRepository.save(tipoAlarme);

    return tipoAlarme;
        
  } catch (error) {
    throw new AppError(400, "Erro ao criar tipo de alarme!");    
  }
};

export default createTipoAlarmeTemsService;
