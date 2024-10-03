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
        tipoPlanta,
        frontTypeFailure,
        tipoFalha,
        manager,
        familia,
        identifier,
        frontNodeReference,
        frontDomain,
        frontElementType,
        frontScriptProbe,
        frontAlarmId,
        frontPodName
    } = dataT

    /**
        UTILIZAR ESTE REPLACE PARA TODOS OS CAMPOS, A FIM DE EVITAR ERROS DE BUSCA POR CARACTERES ACENTUADOS:        
        .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    */

    const tipoTaFormated = !!tipoTA? tipoTA.replaceAll('Gerência', 'Gerencia').replaceAll('Comutação', 'Comutacao') : null
    const frontTypeTaFormated = !!frontTypeTa? frontTypeTa.replaceAll('Gerência', 'Gerencia').replaceAll('Comutação', 'Comutacao') : null 
    
    const query_gp_atc = `SELECT grupos_atuacao.*, usuarios."id" as usuario_id, usuarios."nome", usuarios."tel_cel" FROM grupos_alarmes_tems
    JOIN tipo_alarme_tems ON tipo_alarme_tems."grupoAlarmeId" = grupos_alarmes_tems.id
    JOIN grupos_alarmes_tems_grupos_atuacao_grupos_atuacao ON grupos_alarmes_tems_grupos_atuacao_grupos_atuacao."gruposAlarmesTemsId" = grupos_alarmes_tems.id
    JOIN grupos_atuacao ON grupos_alarmes_tems_grupos_atuacao_grupos_atuacao."gruposAtuacaoId" = grupos_atuacao.id
    JOIN grupos_atuacao_usuarios_usuarios ON grupos_atuacao_usuarios_usuarios."gruposAtuacaoId" = grupos_atuacao.id
    JOIN usuarios ON grupos_atuacao_usuarios_usuarios."usuariosId" = usuarios.id
    JOIN datas ON datas."usuarioId" = usuarios.id
    WHERE grupos_alarmes_tems_grupos_atuacao_grupos_atuacao."gruposAtuacaoId" = grupos_atuacao.id
    AND grupos_atuacao_usuarios_usuarios."gruposAtuacaoId" = grupos_atuacao.id
    AND (tipo_alarme_tems."estadoSigla" IS NULL OR tipo_alarme_tems."estadoSigla" ILIKE $1::text)
    AND (tipo_alarme_tems."specificProblem" IS NULL OR tipo_alarme_tems."specificProblem" ILIKE $2::text OR tipo_alarme_tems."specificProblem" ILIKE $3::text)
    AND (tipo_alarme_tems."frontNetworkType" IS NULL OR tipo_alarme_tems."frontNetworkType" ILIKE $4::text OR tipo_alarme_tems."frontNetworkType" ILIKE $5::text)
    AND (tipo_alarme_tems."frontTypeTa" IS NULL OR tipo_alarme_tems."frontTypeTa" ILIKE $6::text OR tipo_alarme_tems."frontTypeTa" ILIKE $7::text)
    AND (tipo_alarme_tems."frontPlantType" IS NULL OR tipo_alarme_tems."frontPlantType" = '' OR tipo_alarme_tems."frontPlantType" ILIKE $8::text OR tipo_alarme_tems."frontPlantType" ILIKE $9::text)
    AND (tipo_alarme_tems."frontTypeFailure" IS NULL OR tipo_alarme_tems."frontTypeFailure" = '' OR tipo_alarme_tems."frontTypeFailure" ILIKE $10::text OR tipo_alarme_tems."frontTypeFailure" ILIKE $11::text)
    AND (tipo_alarme_tems."manager" IS NULL OR tipo_alarme_tems."manager" = '' OR tipo_alarme_tems."manager" ILIKE '%' || $12::text || '%')
    AND (tipo_alarme_tems."familia" IS NULL OR tipo_alarme_tems."familia" ILIKE $13::text)
    AND (tipo_alarme_tems."identifier" IS NULL OR tipo_alarme_tems."identifier" ILIKE $14::text)
    AND (tipo_alarme_tems."frontNodeReference" IS NULL OR tipo_alarme_tems."frontNodeReference" ILIKE $15::text)
    AND (tipo_alarme_tems."frontDomain" IS NULL OR tipo_alarme_tems."frontDomain" ILIKE $16::text)
    AND (tipo_alarme_tems."frontElementType" IS NULL OR tipo_alarme_tems."frontElementType" ILIKE $17::text)
    AND (tipo_alarme_tems."frontScriptProbe" IS NULL OR tipo_alarme_tems."frontScriptProbe" ILIKE $18::text)
    AND (tipo_alarme_tems."frontAlarmId" IS NULL OR tipo_alarme_tems."frontAlarmId" ILIKE $19::text)
    AND (tipo_alarme_tems."frontPodName" IS NULL OR tipo_alarme_tems."frontPodName" ILIKE $20::text)
    AND (NOW() - INTERVAL '3 hours') BETWEEN datas."dtInicio" AND datas."dtFim";
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
        tipoPlanta,
        frontTypeFailure,
        tipoFalha,
        manager,
        familia,
        identifier,
        frontNodeReference,
        frontDomain,
        frontElementType,
        frontScriptProbe,
        frontAlarmId,
        frontPodName
    ]);  

    return grupo_atuacao
}

export default matchGroupAlarmeService