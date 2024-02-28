import { AppDataSourceTemsHistory } from "../../data-source";
import { AlarmesHistoryTems } from "../../../src-temsHist/entities/alarmesTems.entity";

const createAlarmesHistoryTemsService = async (data: any) => {
  const alarmesRepository = AppDataSourceTemsHistory.getRepository(AlarmesHistoryTems);

  const transfer = {
    TA: data?._id,  

    TIPO_TA: data?.type,
  
    DESCRICAO: data?.description,
   
    DATA_APRESENTACAO: data?.presentationDate,
  
    SISTEMA_ORIGEM: data?.originatingSystem,
  
    STATUS: data?.status,
  
    CLASSIFICACAO: data?.category,

    ESTADO: data?.affectedResource[0]?.place?.stateOrProvince,
  
    MUNICIPIO: data?.affectedResource[0]?.place?.cnlAcronym,
  
    LOCALIDADE: data?.affectedResource[0]?.place?.cnlAcronym,
  
    SITE: data?.affectedResource[0]?.place?.microarea,
  
    TIPO_ALARME: data?.extensionInfo?.filter((item:any)=>{
      if(item?.name == 'alarmTypeParent'){
        return item.value
      }
    })[0]?.value,
  
    TIPO_PLANTA: data?.extensionInfo?.filter((item:any)=>{
      if(item?.name == 'planType'){
        return item?.value
      }
    })[0]?.value,
  
    TIPO_REDE: data?.extensionInfo?.filter((item:any)=>{
      if(item?.name == 'networkType'){
        return item?.value
      }
    })[0]?.value,
  }

  const alarm = alarmesRepository.create(transfer)
  await alarmesRepository.save(alarm)

  return alarm
};

export default createAlarmesHistoryTemsService;