import { AlarmesHistoryTems } from "../../../src-temsHist/entities/alarmesTems.entity";
import { AppDataSourceTemsHistory } from "../../data-source";

const listAlarmesHistoryTemsService = async (data: any,page:number,pageSize:number) => {// devolver quando virar post =>  
  const limit = pageSize || 10;
  const offset = page === 0 ? 0 : (page - 1) * limit;

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
  } = data;

  const alarmesRepository = AppDataSourceTemsHistory.getRepository(AlarmesHistoryTems);
  const totalItems = await alarmesRepository.count()
  // const results = await alarmesRepository.find({
  //   take: pageSize,
  //   skip: (page - 1) * pageSize,
  //   order: {
  //     id: 'DESC',
  //   }
  // })

  const query = `SELECT * FROM alarmes_history_tems 
                 WHERE ($1::text IS NULL OR "TIPO_TA" = $1::text)
                 AND ($2::text IS NULL OR "TIPO_REDE" = $2::text)
                 AND ($3::text IS NULL OR "ESTADO" = $3::text)
                 AND ($4::text IS NULL OR "LOCALIDADE" = $4::text)
                 AND ($5::text IS NULL OR "SITE" = $5::text)
                 AND ($6::text IS NULL OR "TIPO_ALARME" = $6::text)
                 AND ($7::text IS NULL OR "CLASSIFICACAO" = $7::text)
                 AND ($8::timestamp IS NULL AND $9::timestamp IS NULL OR ("DATA_APRESENTACAO" BETWEEN $8::timestamp AND $9::timestamp))
                 ORDER BY "id" DESC
                 LIMIT $10  OFFSET $11
                 `;

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

export default listAlarmesHistoryTemsService;
