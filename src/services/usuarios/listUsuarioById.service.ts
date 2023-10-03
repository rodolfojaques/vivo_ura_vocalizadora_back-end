import AppDataSource from "../../data-source"
import { Usuarios } from "../../entities/usuarios.entity"
import { AppError } from "../../error/appError"

const listUsuarioByIdService = async (id:number) => {
    const usuarioRepository = AppDataSource.getRepository(Usuarios)
    const usuario = await usuarioRepository.findOneBy({id: id})

    if(!usuario) throw new AppError(404,"Usuário não encontrado")

    return usuario
}

export default listUsuarioByIdService