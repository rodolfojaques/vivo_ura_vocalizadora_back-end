import { AppDataSource } from "../../data-source";
import { GruposAtuacao } from "../../entities/gruposAtuacao.entity";

const filterGruposAtuacaoTemsService = async (value:string) => {
  const gruposAtuacaoRepository = AppDataSource.getRepository(GruposAtuacao);
  const grupos = await gruposAtuacaoRepository.find({where:{typeTeam:'DL'}});

  if(value === null) return grupos

  const gruposSelec = grupos.filter(item => item.nomeGrupo.toLowerCase().includes(value.toLowerCase()))

  return gruposSelec;
};

export default filterGruposAtuacaoTemsService;
