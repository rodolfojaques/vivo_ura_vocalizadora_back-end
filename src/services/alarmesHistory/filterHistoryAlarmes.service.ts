import { AlarmesHistory } from "../../../src-new/entities/alarmes.entity";
import { AppDataSourceHistory } from "../../data-source";

const filterAlarmesHistoryService = async (data: any, page:number,pageSize:number) => {
  const limit = pageSize || 10;
  const offset = page === 0 ? 0 : (page - 1) * limit;

  const {
   ALARME,
  } = data;

  const alarmesRepository = AppDataSourceHistory.getRepository(AlarmesHistory);

  const query = `SELECT * FROM alarmes_history
                 WHERE ($1::text IS NULL OR "TIPO_TA" ILIKE '%' || $1::text || '%')
                 OR ($1::text IS NULL OR "TIPO_REDE" ILIKE '%' || $1::text || '%')
                 OR ($1::text IS NULL OR "ESTADO" ILIKE '%' || $1::text || '%')
                 OR ($1::text IS NULL OR "LOCALIDADE" ILIKE '%' || $1::text || '%')
                 OR ($1::text IS NULL OR "SITE" ILIKE '%' || $1::text || '%')
                 OR ($1::text IS NULL OR "TIPO_ALARME" ILIKE '%' || $1::text || '%')
                 OR ($1::text IS NULL OR "CLASSIFICACAO" ILIKE '%' || $1::text || '%') 
                 OR ($1::text IS NULL OR "ALARME" ILIKE '%' || $1::text || '%')
                 ORDER BY "id" DESC
                 LIMIT $2  OFFSET $3
                 `;

  const queryCount = `SELECT * FROM alarmes_history 
                WHERE ($1::text IS NULL OR "TIPO_TA" ILIKE '%' || $1::text || '%')
                OR ($1::text IS NULL OR "TIPO_REDE" ILIKE '%' || $1::text || '%')
                OR ($1::text IS NULL OR "ESTADO" ILIKE '%' || $1::text || '%')
                OR ($1::text IS NULL OR "LOCALIDADE" ILIKE '%' || $1::text || '%')
                OR ($1::text IS NULL OR "SITE" ILIKE '%' || $1::text || '%')
                OR ($1::text IS NULL OR "TIPO_ALARME" ILIKE '%' || $1::text || '%')
                OR ($1::text IS NULL OR "CLASSIFICACAO" ILIKE '%' || $1::text || '%') 
                OR ($1::text IS NULL OR "ALARME" ILIKE '%' || $1::text || '%')
                `;

  const results = await alarmesRepository.query(query, [
    ALARME,
    limit,
    offset
  ]);

  const count = await alarmesRepository.query(queryCount, [
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

export default filterAlarmesHistoryService;
