import { AppDataSource } from "../../data-source";

const matchGroupAlarmeService = async (data:any) => {

    const dataT = {
        ...data,
        ...data.persistent
    }

    const {
        estadoSigla,
        specificProblem,
        tipoDeAlarme,
        tipoRede,
        tipoTA,
        tipoPlanta,
        tipoFalha,
        manager
    } = dataT

    const query = `SELECT grupos_alarmes_tems.* FROM grupos_alarmes_tems
    JOIN tipo_alarme_tems ON tipo_alarme_tems."grupoAlarmeId" = grupos_alarmes_tems.id
    WHERE ($1::text IS NULL OR tipo_alarme_tems."estadoSigla" = $1::text)
    AND ($2::text IS NULL OR tipo_alarme_tems."specificProblem" = $2::text)
    AND ($3::text IS NULL OR tipo_alarme_tems."tipoDeAlarme" = $3::text)
    AND ($4::text IS NULL OR tipo_alarme_tems."tipoRede" = $4::text)
    AND ($5::text IS NULL OR tipo_alarme_tems."tipoTA" = $5::text)
    AND ($6::text IS NULL OR tipo_alarme_tems."tipoPlanta" = $6::text)
    AND ($7::text IS NULL OR tipo_alarme_tems."tipoFalha" = $7::text)
    AND ($8::text IS NULL OR tipo_alarme_tems."manager" = $8::text)
    `;

    const response = await AppDataSource.query(query, [
        estadoSigla,
        specificProblem,
        tipoDeAlarme,
        tipoRede,
        tipoTA,
        tipoPlanta,
        tipoFalha,
        manager
    ]);

    return response
}

export default matchGroupAlarmeService