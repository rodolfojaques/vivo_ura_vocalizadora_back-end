import { AlarmesHistoryTems } from "../../../src-temsHist/entities/alarmesTems.entity";
import { AppDataSourceTemsHistory } from "../../data-source";

const filterGeneralHistoryAlarmesTems = async (data: any, page: number, pageSize: number) => {
    const limit = pageSize || 10;
    const offset = page === 0 ? 0 : (page - 1) * limit;
    
    const {
        frontTypeTa,
        frontNetworkType,
        estadoSigla,
        frontPlantType,
        specificProblem,
        frontAlarmId,
        classificacao,
        DATA_INICIO,
        DATA_FIM,
        ULTIMOS_EM,
        ALARME
    } = data;
    
    const alarmesRepository = AppDataSourceTemsHistory.getRepository(AlarmesHistoryTems);

    const ULTIMOS = (data: string) => {
        try {
            const arrData = data?.split(" ");
            const time = arrData[0];
            const unidade = arrData[1];

            if (unidade === "min") {
                return `${time} minute`;
            } else if (unidade === "horas" || unidade === "hora") {
                return `${time} hour`;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    };

    const query = `SELECT * FROM alarmes_history_tems 
                   WHERE 
                   (($1::text IS NULL OR "persistent_frontTypeTa" ILIKE $1::text)
                   AND ($2::text IS NULL OR "persistent_frontNetworkType" ILIKE $2::text)
                   AND ($3::text IS NULL OR "persistent_estadoSigla" = $3::text)
                   AND ($4::text IS NULL OR "persistent_frontPlantType" ILIKE $4::text)
                   AND ($5::text IS NULL OR "persistent_specificProblem" = $5::text OR "persistent_frontSpecificProblem" = $5::text)
                   AND ($6::text IS NULL OR "persistent_frontAlarmId" ILIKE $6::text)
                   AND ($7::text IS NULL OR "persistent_classificacao" ILIKE '%' || $7::text || '%')
                   AND ($8::timestamp IS NULL AND $9::timestamp IS NULL OR ("alarmInURA" - interval '3 hours' BETWEEN $8::timestamp AND $9::timestamp + interval '1 day'))
                   AND ($10::interval IS NULL OR "alarmInURA" >= NOW() - $10::interval))
                   
                   AND (("persistent_estadoSigla" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                   OR ("persistent_localidadeSigla" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                   OR ("manager" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                   OR ("identifier" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                   OR ("persistent_frontSpecificProblem" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                   OR ("persistent_specificProblem" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                   OR ("persistent_frontAlarmId" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                   OR ("persistent_frontTypeFailure" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                   OR ("persistent_frontPlantType" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                   OR ("persistent_frontVendor" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                   OR ("persistent_frontTypeTa" ILIKE '%' || $11::text || '%' OR $11::text IS NULL))
                   ORDER BY "id" DESC
                   LIMIT $12 OFFSET $13`;

    const totalCountQuery = `SELECT COUNT(*) FROM alarmes_history_tems 
                             WHERE 
                            (($1::text IS NULL OR "persistent_frontTypeTa" ILIKE $1::text)
                            AND ($2::text IS NULL OR "persistent_frontNetworkType" ILIKE $2::text)
                            AND ($3::text IS NULL OR "persistent_estadoSigla" = $3::text)
                            AND ($4::text IS NULL OR "persistent_frontPlantType" ILIKE $4::text)
                            AND ($5::text IS NULL OR "persistent_specificProblem" = $5::text OR "persistent_frontSpecificProblem" = $5::text)
                            AND ($6::text IS NULL OR "persistent_frontAlarmId" ILIKE $6::text)
                            AND ($7::text IS NULL OR "persistent_classificacao" ILIKE '%' || $7::text || '%')
                            AND ($8::timestamp IS NULL AND $9::timestamp IS NULL OR ("alarmInURA" - interval '3 hours' BETWEEN $8::timestamp AND $9::timestamp + interval '1 day'))
                            AND ($10::interval IS NULL OR "alarmInURA" >= NOW() - $10::interval))
                            
                            AND (("persistent_estadoSigla" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                            OR ("persistent_localidadeSigla" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                            OR ("manager" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                            OR ("identifier" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                            OR ("persistent_frontSpecificProblem" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                            OR ("persistent_specificProblem" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                            OR ("persistent_frontAlarmId" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                            OR ("persistent_frontTypeFailure" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                            OR ("persistent_frontPlantType" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                            OR ("persistent_frontVendor" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                            OR ("persistent_frontTypeTa" ILIKE '%' || $11::text || '%' OR $11::text IS NULL))`;

    const totalItems = await alarmesRepository.query(totalCountQuery, [
        frontTypeTa, frontNetworkType, estadoSigla, frontPlantType, specificProblem,
        frontAlarmId, classificacao, DATA_INICIO, DATA_FIM, ULTIMOS(ULTIMOS_EM), ALARME
    ]);

    const results = await alarmesRepository.query(query, [
        frontTypeTa, frontNetworkType, estadoSigla, frontPlantType, specificProblem,
        frontAlarmId, classificacao, DATA_INICIO, DATA_FIM, ULTIMOS(ULTIMOS_EM), ALARME,
        limit, offset
    ]);

    return {
        items: results,
        totalCount: results.length,
        totalPages: Math.ceil(totalItems[0].count / pageSize),
        currentPage: page,
        total: totalItems[0].count
    };
};

export default filterGeneralHistoryAlarmesTems;
