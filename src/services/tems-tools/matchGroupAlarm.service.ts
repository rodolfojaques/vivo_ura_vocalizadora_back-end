import { AppDataSource } from "../../data-source";

const matchGroupAlarmeService = async (data:any) => {

    const dataT = {
        ...data,
        ...data.persistent
    }

    const {
        estadoSigla,
        specificProblem,
        frontSpecificProblem,
        frontNetworkType,
        tipoRede,
        frontTypeTa,
        tipoTA,
        frontPlantType,
        frontTypeFailure,
        manager
    } = dataT

    const tipoTaFormated = !!tipoTA? tipoTA.replaceAll('Gerência', 'Gerencia').replaceAll('Comutação', 'Comutacao') : null
    const frontTypeTaFormated = !!frontTypeTa? frontTypeTa.replaceAll('Gerência', 'Gerencia').replaceAll('Comutação', 'Comutacao') : null    

    const query_gp_alm = `SELECT grupos_alarmes_tems.* FROM grupos_alarmes_tems
    JOIN tipo_alarme_tems ON tipo_alarme_tems."grupoAlarmeId" = grupos_alarmes_tems."id"
    WHERE tipo_alarme_tems."grupoAlarmeId" = grupos_alarmes_tems."id"
    AND (tipo_alarme_tems."estadoSigla" = $1::text)
    AND (tipo_alarme_tems."specificProblem" = $2::text OR tipo_alarme_tems."specificProblem" = $3::text)
    AND (tipo_alarme_tems."frontNetworkType" = $4::text OR tipo_alarme_tems."frontNetworkType" = $5::text)
    AND (tipo_alarme_tems."frontTypeTa" = $6::text OR tipo_alarme_tems."frontTypeTa" = $7::text)
    AND (tipo_alarme_tems."frontPlantType" IS NULL OR tipo_alarme_tems."frontPlantType" = '' OR tipo_alarme_tems."frontPlantType" = $8::text)
    AND (tipo_alarme_tems."frontTypeFailure" IS NULL OR tipo_alarme_tems."frontTypeFailure" = '' OR tipo_alarme_tems."frontTypeFailure" = $9::text)
    AND (tipo_alarme_tems."manager" IS NULL OR tipo_alarme_tems."manager" = '' OR tipo_alarme_tems."manager" ILIKE '%' || $10::text || '%')
    `;

    const grupo_alarme = await AppDataSource.query(query_gp_alm, [
        estadoSigla,
        specificProblem,
        frontSpecificProblem,        
        frontNetworkType,
        tipoRede,
        frontTypeTaFormated,
        tipoTaFormated,
        frontPlantType,
        frontTypeFailure,
        manager
    ]);
    
    const query_gp_atc = `SELECT grupos_atuacao.* FROM grupos_alarmes_tems
    JOIN tipo_alarme_tems ON tipo_alarme_tems."grupoAlarmeId" = grupos_alarmes_tems.id
    JOIN grupos_alarmes_tems_grupos_atuacao_grupos_atuacao ON grupos_alarmes_tems_grupos_atuacao_grupos_atuacao."gruposAlarmesTemsId" = grupos_alarmes_tems.id
    JOIN grupos_atuacao ON grupos_alarmes_tems_grupos_atuacao_grupos_atuacao."gruposAtuacaoId" = grupos_atuacao.id
    WHERE grupos_alarmes_tems_grupos_atuacao_grupos_atuacao."gruposAtuacaoId" = grupos_atuacao.id
    AND (tipo_alarme_tems."estadoSigla" = $1::text)
    AND (tipo_alarme_tems."specificProblem" = $2::text OR tipo_alarme_tems."specificProblem" = $3::text)
    AND (tipo_alarme_tems."frontNetworkType" = $4::text OR tipo_alarme_tems."frontNetworkType" = $5::text)
    AND (tipo_alarme_tems."frontTypeTa" = $6::text OR tipo_alarme_tems."frontTypeTa" = $7::text)
    AND (tipo_alarme_tems."frontPlantType" IS NULL OR tipo_alarme_tems."frontPlantType" = '' OR tipo_alarme_tems."frontPlantType" = $8::text)
    AND (tipo_alarme_tems."frontTypeFailure" IS NULL OR tipo_alarme_tems."frontTypeFailure" = '' OR tipo_alarme_tems."frontTypeFailure" = $9::text)
    AND (tipo_alarme_tems."manager" IS NULL OR tipo_alarme_tems."manager" = '' OR tipo_alarme_tems."manager" ILIKE '%' || $10::text || '%')
    `;

    const grupo_atuacao = await AppDataSource.query(query_gp_atc, [
        estadoSigla,
        specificProblem,
        frontSpecificProblem,        
        frontNetworkType,
        tipoRede,
        frontTypeTaFormated,
        tipoTaFormated,
        frontPlantType,
        frontTypeFailure,
        manager
    ]);
    
    const query_plantonista = `SELECT usuarios.id, usuarios.nome, usuarios.tel_cel, usuarios.email, usuarios."emChamada", usuarios."emEspera" FROM grupos_alarmes_tems
    JOIN tipo_alarme_tems ON tipo_alarme_tems."grupoAlarmeId" = grupos_alarmes_tems.id
    JOIN grupos_alarmes_tems_grupos_atuacao_grupos_atuacao ON grupos_alarmes_tems_grupos_atuacao_grupos_atuacao."gruposAlarmesTemsId" = grupos_alarmes_tems.id
    JOIN grupos_atuacao ON grupos_alarmes_tems_grupos_atuacao_grupos_atuacao."gruposAtuacaoId" = grupos_atuacao.id
    JOIN grupos_atuacao_usuarios_usuarios ON grupos_atuacao_usuarios_usuarios."gruposAtuacaoId" = grupos_atuacao.id
    JOIN usuarios ON grupos_atuacao_usuarios_usuarios."usuariosId" = usuarios.id
    WHERE grupos_atuacao_usuarios_usuarios."usuariosId" = usuarios.id
    AND (tipo_alarme_tems."estadoSigla" = $1::text)
    AND (tipo_alarme_tems."specificProblem" = $2::text OR tipo_alarme_tems."specificProblem" = $3::text)
    AND (tipo_alarme_tems."frontNetworkType" = $4::text OR tipo_alarme_tems."frontNetworkType" = $5::text)
    AND (tipo_alarme_tems."frontTypeTa" = $6::text OR tipo_alarme_tems."frontTypeTa" = $7::text)
    AND (tipo_alarme_tems."frontPlantType" IS NULL OR tipo_alarme_tems."frontPlantType" = '' OR tipo_alarme_tems."frontPlantType" = $8::text)
    AND (tipo_alarme_tems."frontTypeFailure" IS NULL OR tipo_alarme_tems."frontTypeFailure" = '' OR tipo_alarme_tems."frontTypeFailure" = $9::text)
    AND (tipo_alarme_tems."manager" IS NULL OR tipo_alarme_tems."manager" = '' OR tipo_alarme_tems."manager" ILIKE '%' || $10::text || '%')
    `;

    const plantonista = await AppDataSource.query(query_plantonista, [
        estadoSigla,
        specificProblem,
        frontSpecificProblem,        
        frontNetworkType,
        tipoRede,
        frontTypeTaFormated,
        tipoTaFormated,
        frontPlantType,
        frontTypeFailure,
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
    WHERE grupos_atuacao_usuarios_usuarios."usuariosId" = usuarios.id
    AND (tipo_alarme_tems."estadoSigla" = $1::text)
    AND (tipo_alarme_tems."specificProblem" = $2::text OR tipo_alarme_tems."specificProblem" = $3::text)
    AND (tipo_alarme_tems."frontNetworkType" = $4::text OR tipo_alarme_tems."frontNetworkType" = $5::text)
    AND (tipo_alarme_tems."frontTypeTa" = $6::text OR tipo_alarme_tems."frontTypeTa" = $7::text)
    AND (tipo_alarme_tems."frontPlantType" IS NULL OR tipo_alarme_tems."frontPlantType" = '' OR tipo_alarme_tems."frontPlantType" = $8::text)
    AND (tipo_alarme_tems."frontTypeFailure" IS NULL OR tipo_alarme_tems."frontTypeFailure" = '' OR tipo_alarme_tems."frontTypeFailure" = $9::text)
    AND (tipo_alarme_tems."manager" IS NULL OR tipo_alarme_tems."manager" = '' OR tipo_alarme_tems."manager" ILIKE '%' || $10::text || '%')
    `;

    const dados_vocalizacao = await AppDataSource.query(data_voc, [
        estadoSigla,
        specificProblem,
        frontSpecificProblem,        
        frontNetworkType,
        tipoRede,
        frontTypeTaFormated,
        tipoTaFormated,
        frontPlantType,
        frontTypeFailure,
        manager
    ]);

    return {grupo_alarme, grupo_atuacao, plantonista, dados_vocalizacao}
}

export default matchGroupAlarmeService