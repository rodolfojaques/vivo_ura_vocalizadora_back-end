import { AlarmesHistory } from "../../../src-new/entities/alarmes.entity";
import { AppDataSourceHistory } from "../../data-source";

const listAlarmesHistoryService = async (data: any, page:number,pageSize:number) => {
  const limit = pageSize || 10;
  const offset = page === 0 ? 0 : (page - 1) * limit;
  console.log("entrou em list alarmes");


  const {
    TIPO_TA,
    TIPO_REDE,
    ESTADO,
    LOCALIDADE,
    SITE,
    TIPO_ALARME,
    CLASSIFICACAO,
    DATA_INICIO,
    DATA_FIM,
    ULTIMOS_EM
  } = data;

  const alarmesRepository = AppDataSourceHistory.getRepository(AlarmesHistory);
  const totalItems = await alarmesRepository.count()

  const ULTIMOS = (data:string)=> {
    try {
      const arrData = data?.split(" ")
      const time = arrData[0]
      const unidade = arrData[1]


      if(unidade === "min"){
        return `${time} minute`

      } else if(unidade === "horas" || unidade === "hora"){
        return `${time} hour`

      } else {
        return null        
      }      
    } catch (error) {
      return null
    }
  }
  console.log("ultimos", ULTIMOS(ULTIMOS_EM))

  const query = `SELECT * FROM alarmes_history 
                 WHERE ($1::text IS NULL OR "TIPO_TA" = $1::text)
                 AND ($2::text IS NULL OR "TIPO_REDE" = $2::text)
                 AND ($3::text IS NULL OR "ESTADO" = $3::text)
                 AND ($4::text IS NULL OR "LOCALIDADE" = $4::text)
                 AND ($5::text IS NULL OR "SITE" = $5::text)
                 AND ($6::text IS NULL OR "TIPO_ALARME" = $6::text)
                 AND ($7::text IS NULL OR "CLASSIFICACAO" = $7::text)
                 AND ($8::timestamp IS NULL AND $9::timestamp IS NULL OR ("DATA_APRESENTACAO" BETWEEN $8::timestamp AND $9::timestamp))
                 AND ($10::interval IS NULL OR "DATA_APRESENTACAO" >= NOW() - interval '180 minute' - $10::interval) 
                 ORDER BY "id" DESC
                 LIMIT $11  OFFSET $12
                 `;
  ;
  

  const results = await alarmesRepository.query(query, [
    TIPO_TA,
    TIPO_REDE,
    ESTADO,
    LOCALIDADE,
    SITE,
    TIPO_ALARME,
    CLASSIFICACAO,
    DATA_INICIO,
    DATA_FIM,
    ULTIMOS(ULTIMOS_EM),
    limit,
    offset
  ]);
  
  return {
    items: results,
    totalCount: results.length,
    totalPages: Math.ceil(totalItems / pageSize),
    currentPage: page,
    total: totalItems
  };
};

export default listAlarmesHistoryService;
