import { AppDataSource } from "../../data-source";
import { GruposAtuacao } from "../../entities/gruposAtuacao.entity";
import { AppError } from "../../error/appError";
import { IGrupoAtuacaoUpdate } from "../../interfaces/gruposAtuacao";

const updateGrupoAtuacaoService = async (
  id: number,
  data: IGrupoAtuacaoUpdate
) => {
  const gruposAtuacaoRepository = AppDataSource.getRepository(GruposAtuacao);

  const grupo = await gruposAtuacaoRepository.findOneBy({ id: id });
  if (!grupo) throw new AppError(400, "Grupo não encontrado");

  await gruposAtuacaoRepository.update(id, { ...data });
  const grupoReturned = await gruposAtuacaoRepository.findOneBy({ id: id });

  return grupoReturned;
};

export default updateGrupoAtuacaoService;
