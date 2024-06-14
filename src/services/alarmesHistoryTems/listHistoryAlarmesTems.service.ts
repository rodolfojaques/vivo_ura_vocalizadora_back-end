import { AlarmesHistoryTems } from "../../../src-temsHist/entities/alarmesTems.entity";
import { AppDataSourceTemsHistory } from "../../data-source";

const listAlarmesHistoryTemsService = async (data: any,page:number,size:number) => { 
  const limit = size || 10;
  const offset = page === 0 ? 0 : (page - 1) * limit;

  const {
    frontTypeTa,
    frontNetworkType,
    estadoSigla,
    frontPlantType,
    specificProblem,
    frontAlarmId,
    severity,
    DATA_INICIO,
    DATA_FIM,
    ULTIMOS_EM
  } = data;

  const alarmesRepository = AppDataSourceTemsHistory.getRepository(AlarmesHistoryTems);

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

  const query = `SELECT * FROM alarmes_history_tems 
                 WHERE ($1::text IS NULL OR "persistent_frontTypeTa" ILIKE $1::text)
                 AND ($2::text IS NULL OR "persistent_frontNetworkType" ILIKE $2::text)
                 AND ($3::text IS NULL OR "persistent_estadoSigla" = $3::text)
                 AND ($4::text IS NULL OR "persistent_frontPlantType" ILIKE $4::text)
                 AND ($5::text IS NULL OR "persistent_specificProblem" = $5::text OR "persistent_frontSpecificProblem" = $5::text)
                 AND ($6::text IS NULL OR "persistent_frontAlarmId" ILIKE $6::text)
                 AND ($7::integer IS NULL OR "severity" = $7::integer)
                 AND ($8::timestamp IS NULL AND $9::timestamp IS NULL OR ("alarmInURA" BETWEEN $8::timestamp AND $9::timestamp))
                 AND ($10::interval IS NULL OR "alarmInURA" >= NOW() - interval '360 minute' - $10::interval) 
                 ORDER BY "id" DESC
                 LIMIT $11  OFFSET $12
                 `;
  ;

  const queryCount = `SELECT * FROM alarmes_history_tems 
                 WHERE ($1::text IS NULL OR "persistent_frontTypeTa" ILIKE $1::text)
                 AND ($2::text IS NULL OR "persistent_frontNetworkType" ILIKE $2::text)
                 AND ($3::text IS NULL OR "persistent_estadoSigla" = $3::text)
                 AND ($4::text IS NULL OR "persistent_frontPlantType" ILIKE $4::text)
                 AND ($5::text IS NULL OR "persistent_specificProblem" = $5::text OR "persistent_frontSpecificProblem" = $5::text)
                 AND ($6::text IS NULL OR "persistent_frontAlarmId" ILIKE $6::text)
                 AND ($7::integer IS NULL OR "severity" = $7::integer)
                 AND ($8::timestamp IS NULL AND $9::timestamp IS NULL OR ("alarmInURA" BETWEEN $8::timestamp AND $9::timestamp))
                 AND ($10::interval IS NULL OR "alarmInURA" >= NOW() - interval '360 minute' - $10::interval)
                 `;
  ;

  const totalItems = await alarmesRepository.query(queryCount, [
    frontTypeTa,
    frontNetworkType,
    estadoSigla,
    frontPlantType,
    specificProblem,
    frontAlarmId,
    severity,
    DATA_INICIO,
    DATA_FIM,
    ULTIMOS(ULTIMOS_EM)
  ]);
  

  const results = await alarmesRepository.query(query, [
    frontTypeTa,
    frontNetworkType,
    estadoSigla,
    frontPlantType,
    specificProblem,
    frontAlarmId,
    severity,
    DATA_INICIO,
    DATA_FIM,
    ULTIMOS(ULTIMOS_EM),
    limit,
    offset
  ]);
  
  return {
    items: results,
    totalCount: results.length,
    totalPages: Math.ceil(totalItems.length / size),
    currentPage: page,
    total: totalItems.length
  };
};

export default listAlarmesHistoryTemsService;
