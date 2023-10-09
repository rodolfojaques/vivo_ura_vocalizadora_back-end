import AppDataSource from "../../data-source"
import { GruposAtuacao } from "../../entities/gruposAtuacao.entity"

const listGruposAtuacaoService = async () => {
    const gruposAtuacaoRepository = AppDataSource.getRepository(GruposAtuacao)
    const grupos = await gruposAtuacaoRepository.find()
    return grupos
}

export default listGruposAtuacaoService