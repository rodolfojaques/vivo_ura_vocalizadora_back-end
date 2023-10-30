import { AppDataSource } from "../../data-source";
import { Usuarios } from "../../entities/usuarios.entity";
import { AppError } from "../../error/appError";

const listDataByUsuarioIdService = async (userId: number) => {
  const usuariosRepository = AppDataSource.getRepository(Usuarios);

  const usuario = await usuariosRepository.findOneBy({ id: userId });
  if (!usuario) throw new AppError(400, "Usuário não encontrado");

  return usuario.datas;
};

export default listDataByUsuarioIdService;
