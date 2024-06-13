import { AlarmesHistoryTems } from "../../../src-temsHist/entities/alarmesTems.entity";
import { AppDataSourceTemsHistory } from "../../data-source";

const filterAlarmesTemsHistoryService = async (data: any, page:number,pageSize:number) => {
  const limit = pageSize || 10;
  const offset = page === 0 ? 0 : (page - 1) * limit;

  const {
   ALARME,
  } = data;

  const alarmesTemsRepository = AppDataSourceTemsHistory.getRepository(AlarmesHistoryTems);

  const query = `SELECT * FROM alarmes_history_tems
                 WHERE ($1::text IS NULL OR "persistent_estadoSigla" ILIKE '%' || $1::text || '%')
                 OR ($1::text IS NULL OR "persistent_localidadeSigla" ILIKE '%' || $1::text || '%')
                 OR ($1::text IS NULL OR "manager" ILIKE '%' || $1::text || '%')
                 OR ($1::text IS NULL OR "identifier" ILIKE '%' || $1::text || '%')
                 OR ($1::text IS NULL OR "persistent_frontSpecificProblem" ILIKE '%' || $1::text || '%')
                 OR ($1::text IS NULL OR "persistent_specificProblem" ILIKE '%' || $1::text || '%') 
                 OR ($1::text IS NULL OR "persistent_frontAlarmId" ILIKE '%' || $1::text || '%')
                 OR ($1::text IS NULL OR "persistent_frontTypeFailure" ILIKE '%' || $1::text || '%')
                 OR ($1::text IS NULL OR "persistent_frontPlantType" ILIKE '%' || $1::text || '%')
                 OR ($1::text IS NULL OR "persistent_frontVendor" ILIKE '%' || $1::text || '%')
                 OR ($1::text IS NULL OR "persistent_frontTypeTa" ILIKE '%' || $1::text || '%')
                 ORDER BY "id" DESC
                 LIMIT $2  OFFSET $3
                 `;

  const queryCount = `SELECT * FROM alarmes_history_tems 
                WHERE ($1::text IS NULL OR "persistent_estadoSigla" ILIKE '%' || $1::text || '%')
                OR ($1::text IS NULL OR "persistent_localidadeSigla" ILIKE '%' || $1::text || '%')
                OR ($1::text IS NULL OR "manager" ILIKE '%' || $1::text || '%')
                OR ($1::text IS NULL OR "identifier" ILIKE '%' || $1::text || '%')
                OR ($1::text IS NULL OR "persistent_frontSpecificProblem" ILIKE '%' || $1::text || '%')
                OR ($1::text IS NULL OR "persistent_specificProblem" ILIKE '%' || $1::text || '%') 
                OR ($1::text IS NULL OR "persistent_frontAlarmId" ILIKE '%' || $1::text || '%')
                OR ($1::text IS NULL OR "persistent_frontTypeFailure" ILIKE '%' || $1::text || '%')
                OR ($1::text IS NULL OR "persistent_frontPlantType" ILIKE '%' || $1::text || '%')
                OR ($1::text IS NULL OR "persistent_frontVendor" ILIKE '%' || $1::text || '%')
                OR ($1::text IS NULL OR "persistent_frontTypeTa" ILIKE '%' || $1::text || '%')
                `;

  const results = await alarmesTemsRepository.query(query, [
    ALARME,
    limit,
    offset
  ]);

  const count = await alarmesTemsRepository.query(queryCount, [
    ALARME
  ]);
  
  return {
    items: results,
    totalCount: results.length,
    totalPages: Math.ceil(count.length / pageSize),
    currentPage: page,
    total: count.length
  };
};

export default filterAlarmesTemsHistoryService;
