import { AppDataSource } from "../../data-source";
import { Usuarios } from "../../entities/usuarios.entity";

const listAllUsuariosTemsService = async () => {
  const usuariosRepository = AppDataSource.getRepository(Usuarios);
  const usuarios = await usuariosRepository.find({where:{typeTeam:'DL'}});
  return usuarios;
};

export default listAllUsuariosTemsService;
