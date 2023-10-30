import { AppDataSource } from "../../data-source";
import { GruposAtuacao } from "../../entities/gruposAtuacao.entity";
import { IGrupoAtuacaoReq } from "../../interfaces/gruposAtuacao";

const createGruposDeAtuacaoService = async (data: IGrupoAtuacaoReq) => {
  const gruposAtuacaoRepository = AppDataSource.getRepository(GruposAtuacao);
  const grupo = gruposAtuacaoRepository.create({ ...data });
  await gruposAtuacaoRepository.save(grupo);

  return grupo;
};

export default createGruposDeAtuacaoService;
