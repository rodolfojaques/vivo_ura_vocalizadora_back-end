export interface IGrupoAtuacaoReq {
    nomeGrupo: string;
    gerente1: string;
    contato_ger1: string;
    gerente2: string;
    contato_ger2: string;
}

export interface IGrupoAtuacaoUpdate {
    nomeGrupo?: string;
    gerente1?: string;
    contato_ger1?: string;
    gerente2?: string;
    contato_ger2?: string;
}