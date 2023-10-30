import { AppDataSource } from "../../data-source";
import { Usuarios } from "../../entities/usuarios.entity";
import { AppError } from "../../error/appError";

const deleteUsuarioService = async (id: number) => {
  const usuariosRepository = AppDataSource.getRepository(Usuarios);

  const usuarioAlreadyExist = await usuariosRepository.findOneBy({ id: id });
  if (!usuarioAlreadyExist) throw new AppError(400, "Usuário não encontrado");

  await usuariosRepository.delete(id);

  return true;
};

export default deleteUsuarioService;
