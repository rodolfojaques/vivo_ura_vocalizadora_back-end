import { AppDataSource } from "../../data-source";
import vocalizacaoTemsService from "./vocalizacaoTems.service";

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
    
    
    /**
     *      
        JOIN datas on datas."usuarioId" = usuarios.id
        WHERE dia BETWEEN '2024-09-23 08:00:00' AND '2024-09-24 03:00:00';
     */

    
    const query_gp_atc = `SELECT grupos_atuacao.*, usuarios."id" as usuario_id, usuarios."nome", usuarios."tel_cel" FROM grupos_alarmes_tems
    JOIN tipo_alarme_tems ON tipo_alarme_tems."grupoAlarmeId" = grupos_alarmes_tems.id
    JOIN grupos_alarmes_tems_grupos_atuacao_grupos_atuacao ON grupos_alarmes_tems_grupos_atuacao_grupos_atuacao."gruposAlarmesTemsId" = grupos_alarmes_tems.id
    JOIN grupos_atuacao ON grupos_alarmes_tems_grupos_atuacao_grupos_atuacao."gruposAtuacaoId" = grupos_atuacao.id
    JOIN grupos_atuacao_usuarios_usuarios ON grupos_atuacao_usuarios_usuarios."gruposAtuacaoId" = grupos_atuacao.id
    JOIN usuarios ON grupos_atuacao_usuarios_usuarios."usuariosId" = usuarios.id
    JOIN datas ON datas."usuarioId" = usuarios.id
    WHERE grupos_alarmes_tems_grupos_atuacao_grupos_atuacao."gruposAtuacaoId" = grupos_atuacao.id
    AND grupos_atuacao_usuarios_usuarios."gruposAtuacaoId" = grupos_atuacao.id
    AND (tipo_alarme_tems."estadoSigla" = $1::text)
    AND (tipo_alarme_tems."specificProblem" = $2::text OR tipo_alarme_tems."specificProblem" = $3::text)
    AND (tipo_alarme_tems."frontNetworkType" = $4::text OR tipo_alarme_tems."frontNetworkType" = $5::text)
    AND (tipo_alarme_tems."frontTypeTa" = $6::text OR tipo_alarme_tems."frontTypeTa" = $7::text)
    AND (tipo_alarme_tems."frontPlantType" IS NULL OR tipo_alarme_tems."frontPlantType" = '' OR tipo_alarme_tems."frontPlantType" ILIKE $8::text)
    AND (tipo_alarme_tems."frontTypeFailure" IS NULL OR tipo_alarme_tems."frontTypeFailure" = '' OR tipo_alarme_tems."frontTypeFailure" = $9::text)
    AND (tipo_alarme_tems."manager" IS NULL OR tipo_alarme_tems."manager" = '' OR tipo_alarme_tems."manager" ILIKE '%' || $10::text || '%')
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
        frontTypeFailure,
        manager
    ]);   

    return grupo_atuacao
}

export default matchGroupAlarmeService