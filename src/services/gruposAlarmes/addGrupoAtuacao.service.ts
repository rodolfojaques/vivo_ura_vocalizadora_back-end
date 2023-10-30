import { AppDataSource } from "../../data-source";
import { GruposAlarmes } from "../../entities/gruposAlarmes.entity";
import { GruposAtuacao } from "../../entities/gruposAtuacao.entity";
import { AppError } from "../../error/appError";

const addGrupoAtuacaoService = async (id: number, gpAtuacaoId: number) => {
  const gruposAtuacaoRepository = AppDataSource.getRepository(GruposAtuacao);
  const gruposAlarmesRepository = AppDataSource.getRepository(GruposAlarmes);

  const grupoAlarme = await gruposAlarmesRepository.findOneBy({ id: id });
  if (!grupoAlarme) throw new AppError(400, "Grupo de Alarme não encontrado");

  const grupoAtuacao = await gruposAtuacaoRepository.findOneBy({
    id: gpAtuacaoId,
  });
  if (!grupoAtuacao) throw new AppError(400, "Grupo não encontrado");

  grupoAlarme.gruposAtuacao = [...grupoAlarme.gruposAtuacao, grupoAtuacao];

  await gruposAlarmesRepository.save(grupoAlarme);

  const grupoUpdated = await gruposAlarmesRepository.findOneBy({ id: id });

  return grupoUpdated;
};

export default addGrupoAtuacaoService;
