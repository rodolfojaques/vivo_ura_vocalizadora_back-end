import { AppDataSource } from "../../data-source";
import { GruposAlarmesTems } from "../../entities/gruposAlarmesTems.entity";
import { GruposAtuacao } from "../../entities/gruposAtuacao.entity";
import { AppError } from "../../error/appError";

const deleteGrupoAtuacaoTemsService = async (id: number, gpAtuacaoId: number) => {
  const gruposAtuacaoRepository = AppDataSource.getRepository(GruposAtuacao);
  const gruposAlarmesRepository = AppDataSource.getRepository(GruposAlarmesTems);

  const grupoAlarme = await gruposAlarmesRepository.findOneBy({ id: id });
  if (!grupoAlarme) throw new AppError(400, "Grupo de Alarme não encontrado");

  const grupoAtuacao = await gruposAtuacaoRepository.findOneBy({
    id: gpAtuacaoId,
  });
  if (!grupoAtuacao) throw new AppError(400, "Grupo não encontrado");

  const gruposAtuacaoAtualizados = grupoAlarme.gruposAtuacao.filter(
    (grp) => grp.id !== grupoAtuacao.id
  );
  grupoAlarme.gruposAtuacao = [...gruposAtuacaoAtualizados];

  await gruposAlarmesRepository.save(grupoAlarme);

  const grupoUpdated = await gruposAlarmesRepository.findOneBy({ id: id });

  return grupoUpdated;
};

export default deleteGrupoAtuacaoTemsService;
