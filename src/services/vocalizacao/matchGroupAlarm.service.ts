import { AppDataSource } from "../../data-source";

const matchGroupAlarmeSGService = async (data:any) => {

    const {
        ESTADO,
        SITE,
        TIPO_ALARME,
        CLASSIFICACAO,
        LOCALIDADE
    } = data
    
    const query_gp_atc = `
        SELECT grupos_atuacao.*, usuarios."id" as usuario_id, usuarios."nome", usuarios."tel_cel" FROM grupos_alarmes
        JOIN tipo_alarme ON tipo_alarme."grupoAlarmeId" = grupos_alarmes.id
        JOIN grupos_alarmes_grupos_atuacao_grupos_atuacao ON grupos_alarmes_grupos_atuacao_grupos_atuacao."gruposAlarmesId" = grupos_alarmes.id
        JOIN grupos_atuacao ON grupos_alarmes_grupos_atuacao_grupos_atuacao."gruposAtuacaoId" = grupos_atuacao.id
        JOIN grupos_atuacao_usuarios_usuarios ON grupos_atuacao_usuarios_usuarios."gruposAtuacaoId" = grupos_atuacao.id
        JOIN usuarios ON grupos_atuacao_usuarios_usuarios."usuariosId" = usuarios.id
        JOIN datas ON datas."usuarioId" = usuarios.id
        WHERE grupos_alarmes_grupos_atuacao_grupos_atuacao."gruposAtuacaoId" = grupos_atuacao.id
        AND grupos_atuacao_usuarios_usuarios."gruposAtuacaoId" = grupos_atuacao.id
        AND (tipo_alarme."uf" ILIKE $1::text)
        AND (tipo_alarme."site" ILIKE $2::text)
        AND (tipo_alarme."tipoAlarme" ILIKE $3::text)
        AND (tipo_alarme."classificacao" ILIKE $4::text)
        AND (tipo_alarme."localidade" ILIKE $5::text)
        AND NOW() BETWEEN datas."dtInicio" AND datas."dtFim";
    `;

    const grupo_atuacao = await AppDataSource.query(query_gp_atc, [
        ESTADO,
        SITE,
        TIPO_ALARME,
        CLASSIFICACAO,
        LOCALIDADE   
    ]);  
    
    return grupo_atuacao
}

export default matchGroupAlarmeSGService