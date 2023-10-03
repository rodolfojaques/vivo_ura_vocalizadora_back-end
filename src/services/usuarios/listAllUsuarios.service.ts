import AppDataSource from "../../data-source"
import { Usuarios } from "../../entities/usuarios.entity"

const listAllUsuariosService = async () => {
    const usuariosRepository = AppDataSource.getRepository(Usuarios)
    const usuarios = await usuariosRepository.find()
    return usuarios
}

export default listAllUsuariosService