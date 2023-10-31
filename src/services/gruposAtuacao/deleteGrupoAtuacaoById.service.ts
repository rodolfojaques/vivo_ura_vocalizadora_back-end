import { AppDataSource } from "../../data-source";
import { GruposAtuacao } from "../../entities/gruposAtuacao.entity";
import { AppError } from "../../error/appError";

const deleteGrupoAtuacaoByIdService = async (id: number) => {
  const gruposAtuacaoRepository = AppDataSource.getRepository(GruposAtuacao);

  const grupo = await gruposAtuacaoRepository.findOneBy({ id: id });
  if (!grupo) throw new AppError(400, "Grupo não encontrado");

  await gruposAtuacaoRepository.delete(id);

  return true;
};

export default deleteGrupoAtuacaoByIdService;
