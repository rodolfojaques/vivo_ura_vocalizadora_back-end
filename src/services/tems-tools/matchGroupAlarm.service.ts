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

    const query_gp_alm = `SELECT grupos_alarmes_tems.* FROM grupos_alarmes_tems
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

    const response = await AppDataSource.query(query_gp_alm, [
        estadoSigla,
        specificProblem,
        tipoDeAlarme,
        tipoRede,
        tipoTA,
        tipoPlanta,
        tipoFalha,
        manager
    ]);
    
    const query_gp_atc = `SELECT grupos_atuacao.* FROM grupos_alarmes_tems
    JOIN tipo_alarme_tems ON tipo_alarme_tems."grupoAlarmeId" = grupos_alarmes_tems.id
    JOIN grupos_alarmes_tems_grupos_atuacao_grupos_atuacao ON grupos_alarmes_tems_grupos_atuacao_grupos_atuacao."gruposAlarmesTemsId" = grupos_alarmes_tems.id
    JOIN grupos_atuacao ON grupos_alarmes_tems_grupos_atuacao_grupos_atuacao."gruposAtuacaoId" = grupos_atuacao.id
    WHERE ($1::text IS NULL OR tipo_alarme_tems."estadoSigla" = $1::text)
    AND ($2::text IS NULL OR tipo_alarme_tems."specificProblem" = $2::text)
    AND ($3::text IS NULL OR tipo_alarme_tems."tipoDeAlarme" = $3::text)
    AND ($4::text IS NULL OR tipo_alarme_tems."tipoRede" = $4::text)
    AND ($5::text IS NULL OR tipo_alarme_tems."tipoTA" = $5::text)
    AND ($6::text IS NULL OR tipo_alarme_tems."tipoPlanta" = $6::text)
    AND ($7::text IS NULL OR tipo_alarme_tems."tipoFalha" = $7::text)
    AND ($8::text IS NULL OR tipo_alarme_tems."manager" = $8::text)
    `;

    const response_2 = await AppDataSource.query(query_gp_atc, [
        estadoSigla,
        specificProblem,
        tipoDeAlarme,
        tipoRede,
        tipoTA,
        tipoPlanta,
        tipoFalha,
        manager
    ]);
    
    const query_plantonista = `SELECT usuarios.* FROM grupos_alarmes_tems
    JOIN tipo_alarme_tems ON tipo_alarme_tems."grupoAlarmeId" = grupos_alarmes_tems.id
    JOIN grupos_alarmes_tems_grupos_atuacao_grupos_atuacao ON grupos_alarmes_tems_grupos_atuacao_grupos_atuacao."gruposAlarmesTemsId" = grupos_alarmes_tems.id
    JOIN grupos_atuacao ON grupos_alarmes_tems_grupos_atuacao_grupos_atuacao."gruposAtuacaoId" = grupos_atuacao.id
    JOIN grupos_atuacao_usuarios_usuarios ON grupos_atuacao_usuarios_usuarios."gruposAtuacaoId" = grupos_atuacao.id
    JOIN usuarios ON grupos_atuacao_usuarios_usuarios."usuariosId" = usuarios.id
    WHERE ($1::text IS NULL OR tipo_alarme_tems."estadoSigla" = $1::text)
    AND ($2::text IS NULL OR tipo_alarme_tems."specificProblem" = $2::text)
    AND ($3::text IS NULL OR tipo_alarme_tems."tipoDeAlarme" = $3::text)
    AND ($4::text IS NULL OR tipo_alarme_tems."tipoRede" = $4::text)
    AND ($5::text IS NULL OR tipo_alarme_tems."tipoTA" = $5::text)
    AND ($6::text IS NULL OR tipo_alarme_tems."tipoPlanta" = $6::text)
    AND ($7::text IS NULL OR tipo_alarme_tems."tipoFalha" = $7::text)
    AND ($8::text IS NULL OR tipo_alarme_tems."manager" = $8::text)
    `;

    const response_3 = await AppDataSource.query(query_plantonista, [
        estadoSigla,
        specificProblem,
        tipoDeAlarme,
        tipoRede,
        tipoTA,
        tipoPlanta,
        tipoFalha,
        manager
    ]);

    // CONTINUAR DA MONTAGEM DE OBJETO PARA PERSISTENCIA NO BANCO DE DADOS
    return {response, response_2, response_3}
}

export default matchGroupAlarmeService