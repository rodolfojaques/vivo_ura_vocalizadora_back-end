import { AlarmesHistory } from "../../../src-new/entities/alarmes.entity";
import { AppDataSourceHistory } from "../../data-source";

const filterGeneralHistoryAlarmes = async (data: any, page: number, pageSize: number) => {
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
        ULTIMOS_EM,
        ALARME
    } = data;
    
    const alarmesRepository = AppDataSourceHistory.getRepository(AlarmesHistory);

    const ULTIMOS = (data: string) => {
        if (!data) return null;
        try {
            const [time, unidade] = data.split(" ");
            if (unidade === "min") return `${time} minute`;
            if (unidade === "horas" || unidade === "hora") return `${time} hour`;
            return null;
        } catch (error) {
            return null;
        }
    };

    const query = `SELECT * FROM alarmes_history 
                   WHERE 
                   (($1::text IS NULL OR "TIPO_TA" ILIKE $1::text)
                   AND ($2::text IS NULL OR "TIPO_REDE" ILIKE $2::text)
                   AND ($3::text IS NULL OR "ESTADO" ILIKE $3::text)
                   AND ($4::text IS NULL OR "LOCALIDADE" ILIKE $4::text)
                   AND ($5::text IS NULL OR "SITE" ILIKE $5::text)
                   AND ($6::text IS NULL OR "TIPO_ALARME" ILIKE $6::text)
                   AND ($7::text IS NULL OR "CLASSIFICACAO" ILIKE $7::text)
                   AND ($8::timestamp IS NULL AND $9::timestamp IS NULL OR ("DATA_APRESENTACAO" BETWEEN $8::timestamp AND $9::timestamp + interval '1 day'))
                   AND ($10::interval IS NULL OR "DATA_APRESENTACAO" >= NOW() - interval '180 minute' - $10::interval))
                   
                   AND (("TIPO_TA" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                   OR ("TIPO_REDE" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                   OR ("ESTADO" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                   OR ("LOCALIDADE" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                   OR ("SITE" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                   OR ("TIPO_ALARME" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                   OR ("CLASSIFICACAO" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                   OR ($11::text IS NULL OR "ALARME" ILIKE '%' || $11::text || '%'))
                   ORDER BY "id" DESC
                   LIMIT $12 OFFSET $13`;

    const totalCountQuery = `SELECT COUNT(*) FROM alarmes_history 
                            WHERE 
                            (($1::text IS NULL OR "TIPO_TA" ILIKE $1::text)
                            AND ($2::text IS NULL OR "TIPO_REDE" ILIKE $2::text)
                            AND ($3::text IS NULL OR "ESTADO" ILIKE $3::text)
                            AND ($4::text IS NULL OR "LOCALIDADE" ILIKE $4::text)
                            AND ($5::text IS NULL OR "SITE" ILIKE $5::text)
                            AND ($6::text IS NULL OR "TIPO_ALARME" ILIKE $6::text)
                            AND ($7::text IS NULL OR "CLASSIFICACAO" ILIKE $7::text)
                            AND ($8::timestamp IS NULL AND $9::timestamp IS NULL OR ("DATA_APRESENTACAO" BETWEEN $8::timestamp AND $9::timestamp + interval '1 day'))
                            AND ($10::interval IS NULL OR "DATA_APRESENTACAO" >= NOW() - interval '180 minute' - $10::interval))
                  
                            AND (("TIPO_TA" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                            OR ("TIPO_REDE" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                            OR ("ESTADO" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                            OR ("LOCALIDADE" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                            OR ("SITE" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                            OR ("TIPO_ALARME" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                            OR ("CLASSIFICACAO" ILIKE '%' || $11::text || '%' OR $11::text IS NULL)
                            OR ($11::text IS NULL OR "ALARME" ILIKE '%' || $11::text || '%'))`;

    const totalItems = await alarmesRepository.query(totalCountQuery, [
        TIPO_TA, TIPO_REDE, ESTADO, LOCALIDADE, SITE, TIPO_ALARME,
        CLASSIFICACAO, DATA_INICIO, DATA_FIM, ULTIMOS(ULTIMOS_EM), ALARME
    ]);

    const results = await alarmesRepository.query(query, [
        TIPO_TA, TIPO_REDE, ESTADO, LOCALIDADE, SITE, TIPO_ALARME,
        CLASSIFICACAO, DATA_INICIO, DATA_FIM, ULTIMOS(ULTIMOS_EM), ALARME,
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

export default filterGeneralHistoryAlarmes;
