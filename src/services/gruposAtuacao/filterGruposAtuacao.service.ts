import { AppDataSource } from "../../data-source";
import { GruposAtuacao } from "../../entities/gruposAtuacao.entity";

const filterGruposAtuacaoService = async (value:string) => {
  const gruposAtuacaoRepository = AppDataSource.getRepository(GruposAtuacao);
  const grupos = await gruposAtuacaoRepository.find({where:{typeTeam:'SG'}});

  if(value === null) return grupos

  const gruposSelec = grupos.filter(item => item.nomeGrupo.toLowerCase().includes(value.toLowerCase()))

  return gruposSelec;
};

export default filterGruposAtuacaoService;
