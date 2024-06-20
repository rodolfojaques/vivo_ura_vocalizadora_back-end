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
    AND ($2::text IS NULL OR tipo_alarme_tems."specificProblem" IS NULL OR tipo_alarme_tems."specificProblem" = $2::text)
    AND ($3::text IS NULL OR tipo_alarme_tems."tipoDeAlarme" IS NULL OR tipo_alarme_tems."tipoDeAlarme" = $3::text)
    AND ($4::text IS NULL OR tipo_alarme_tems."tipoRede" IS NULL OR tipo_alarme_tems."tipoRede" = $4::text)
    AND ($5::text IS NULL OR tipo_alarme_tems."tipoTA" IS NULL OR tipo_alarme_tems."tipoTA" = $5::text)
    AND ($6::text IS NULL OR tipo_alarme_tems."tipoPlanta" IS NULL OR tipo_alarme_tems."tipoPlanta" = $6::text)
    AND ($7::text IS NULL OR tipo_alarme_tems."tipoFalha" IS NULL OR tipo_alarme_tems."tipoFalha" = $7::text)
    AND ($8::text IS NULL OR tipo_alarme_tems."manager" IS NULL OR tipo_alarme_tems."manager" = $8::text)
    `;

    const grupo_alarme = await AppDataSource.query(query_gp_alm, [
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
    AND ($2::text IS NULL OR tipo_alarme_tems."specificProblem" IS NULL OR tipo_alarme_tems."specificProblem" = $2::text)
    AND ($3::text IS NULL OR tipo_alarme_tems."tipoDeAlarme" IS NULL OR tipo_alarme_tems."tipoDeAlarme" = $3::text)
    AND ($4::text IS NULL OR tipo_alarme_tems."tipoRede" IS NULL OR tipo_alarme_tems."tipoRede" = $4::text)
    AND ($5::text IS NULL OR tipo_alarme_tems."tipoTA" IS NULL OR tipo_alarme_tems."tipoTA" = $5::text)
    AND ($6::text IS NULL OR tipo_alarme_tems."tipoPlanta" IS NULL OR tipo_alarme_tems."tipoPlanta" = $6::text)
    AND ($7::text IS NULL OR tipo_alarme_tems."tipoFalha" IS NULL OR tipo_alarme_tems."tipoFalha" = $7::text)
    AND ($8::text IS NULL OR tipo_alarme_tems."manager" IS NULL OR tipo_alarme_tems."manager" = $8::text)
    `;

    const grupo_atuacao = await AppDataSource.query(query_gp_atc, [
        estadoSigla,
        specificProblem,
        tipoDeAlarme,
        tipoRede,
        tipoTA,
        tipoPlanta,
        tipoFalha,
        manager
    ]);
    
    const query_plantonista = `SELECT usuarios.id, usuarios.nome, usuarios.tel_cel, usuarios.email, usuarios."emChamada", usuarios."emEspera" FROM grupos_alarmes_tems
    JOIN tipo_alarme_tems ON tipo_alarme_tems."grupoAlarmeId" = grupos_alarmes_tems.id
    JOIN grupos_alarmes_tems_grupos_atuacao_grupos_atuacao ON grupos_alarmes_tems_grupos_atuacao_grupos_atuacao."gruposAlarmesTemsId" = grupos_alarmes_tems.id
    JOIN grupos_atuacao ON grupos_alarmes_tems_grupos_atuacao_grupos_atuacao."gruposAtuacaoId" = grupos_atuacao.id
    JOIN grupos_atuacao_usuarios_usuarios ON grupos_atuacao_usuarios_usuarios."gruposAtuacaoId" = grupos_atuacao.id
    JOIN usuarios ON grupos_atuacao_usuarios_usuarios."usuariosId" = usuarios.id
    WHERE ($1::text IS NULL OR tipo_alarme_tems."estadoSigla" = $1::text)
    AND ($2::text IS NULL OR tipo_alarme_tems."specificProblem" IS NULL OR tipo_alarme_tems."specificProblem" = $2::text)
    AND ($3::text IS NULL OR tipo_alarme_tems."tipoDeAlarme" IS NULL OR tipo_alarme_tems."tipoDeAlarme" = $3::text)
    AND ($4::text IS NULL OR tipo_alarme_tems."tipoRede" IS NULL OR tipo_alarme_tems."tipoRede" = $4::text)
    AND ($5::text IS NULL OR tipo_alarme_tems."tipoTA" IS NULL OR tipo_alarme_tems."tipoTA" = $5::text)
    AND ($6::text IS NULL OR tipo_alarme_tems."tipoPlanta" IS NULL OR tipo_alarme_tems."tipoPlanta" = $6::text)
    AND ($7::text IS NULL OR tipo_alarme_tems."tipoFalha" IS NULL OR tipo_alarme_tems."tipoFalha" = $7::text)
    AND ($8::text IS NULL OR tipo_alarme_tems."manager" IS NULL OR tipo_alarme_tems."manager" = $8::text)
    `;

    const plantonista = await AppDataSource.query(query_plantonista, [
        estadoSigla,
        specificProblem,
        tipoDeAlarme,
        tipoRede,
        tipoTA,
        tipoPlanta,
        tipoFalha,
        manager
    ]);
    
    const data_voc = `SELECT 
    grupos_atuacao.id as id_grupo_atuacao,
    grupos_atuacao.contato_ger1 as contato_ger1,
    grupos_atuacao.gerente1 as nome_gerente1,
    grupos_atuacao.contato_ger2 as contato_ger2,
    grupos_atuacao.gerente2 as nome_gerente2,
    usuarios.id as id_plantonista,
    usuarios.nome as nome_plantonista,
    usuarios.tel_cel as contato_plantonista
    FROM grupos_alarmes_tems
    JOIN tipo_alarme_tems ON tipo_alarme_tems."grupoAlarmeId" = grupos_alarmes_tems.id
    JOIN grupos_alarmes_tems_grupos_atuacao_grupos_atuacao ON grupos_alarmes_tems_grupos_atuacao_grupos_atuacao."gruposAlarmesTemsId" = grupos_alarmes_tems.id
    JOIN grupos_atuacao ON grupos_alarmes_tems_grupos_atuacao_grupos_atuacao."gruposAtuacaoId" = grupos_atuacao.id
    JOIN grupos_atuacao_usuarios_usuarios ON grupos_atuacao_usuarios_usuarios."gruposAtuacaoId" = grupos_atuacao.id
    JOIN usuarios ON grupos_atuacao_usuarios_usuarios."usuariosId" = usuarios.id
    WHERE ($1::text IS NULL OR tipo_alarme_tems."estadoSigla" = $1::text)
    AND ($2::text IS NULL OR tipo_alarme_tems."specificProblem" IS NULL OR tipo_alarme_tems."specificProblem" = $2::text)
    AND ($3::text IS NULL OR tipo_alarme_tems."tipoDeAlarme" IS NULL OR tipo_alarme_tems."tipoDeAlarme" = $3::text)
    AND ($4::text IS NULL OR tipo_alarme_tems."tipoRede" IS NULL OR tipo_alarme_tems."tipoRede" = $4::text)
    AND ($5::text IS NULL OR tipo_alarme_tems."tipoTA" IS NULL OR tipo_alarme_tems."tipoTA" = $5::text)
    AND ($6::text IS NULL OR tipo_alarme_tems."tipoPlanta" IS NULL OR tipo_alarme_tems."tipoPlanta" = $6::text)
    AND ($7::text IS NULL OR tipo_alarme_tems."tipoFalha" IS NULL OR tipo_alarme_tems."tipoFalha" = $7::text)
    AND ($8::text IS NULL OR tipo_alarme_tems."manager" IS NULL OR tipo_alarme_tems."manager" = $8::text)
    `;

    const dados_vocalizacao = await AppDataSource.query(data_voc, [
        estadoSigla,
        specificProblem,
        tipoDeAlarme,
        tipoRede,
        tipoTA,
        tipoPlanta,
        tipoFalha,
        manager
    ]);

    return {grupo_alarme, grupo_atuacao, plantonista, dados_vocalizacao}
}

export default matchGroupAlarmeService