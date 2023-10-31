import { AppDataSource } from "../../data-source";
import { GruposAtuacao } from "../../entities/gruposAtuacao.entity";
import { Usuarios } from "../../entities/usuarios.entity";
import { AppError } from "../../error/appError";

const addUsuarioService = async (id: number, data: any) => {
  const gruposAtuacaoRepository = AppDataSource.getRepository(GruposAtuacao);
  const usuariosRepository = AppDataSource.getRepository(Usuarios);

  const usuario = await usuariosRepository.findOneBy({ id: data.userId });
  if (!usuario) throw new AppError(400, "Usuário não encontrado");

  const grupo = await gruposAtuacaoRepository.findOneBy({ id: id });
  if (!grupo) throw new AppError(400, "Grupo não encontrado");

  grupo.usuarios = [...grupo.usuarios, usuario];

  await gruposAtuacaoRepository.save(grupo);

  const grupoUpdated = await gruposAtuacaoRepository.findOneBy({ id: id });

  return grupoUpdated;
};

export default addUsuarioService;
