import { AppDataSource } from "../../data-source";
import { Usuarios } from "../../entities/usuarios.entity";

const listAllUsuariosInfraService = async () => {
  const usuariosRepository = AppDataSource.getRepository(Usuarios);
  const usuarios = await usuariosRepository.find({where:{typeTeam:'SG'}});
  return usuarios;
};

export default listAllUsuariosInfraService;
