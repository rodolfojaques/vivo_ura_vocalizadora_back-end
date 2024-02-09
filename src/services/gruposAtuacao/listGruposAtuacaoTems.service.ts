import { AppDataSource } from "../../data-source";
import { GruposAtuacao } from "../../entities/gruposAtuacao.entity";

const listGruposAtuacaoTemsService = async () => {
  const gruposAtuacaoRepository = AppDataSource.getRepository(GruposAtuacao);
  const grupos = await gruposAtuacaoRepository.find({where:{typeTeam:'DL'}});
  return grupos;
};

export default listGruposAtuacaoTemsService;
