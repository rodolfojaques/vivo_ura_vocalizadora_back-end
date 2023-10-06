import AppDataSource from "../../data-source"
import { Datas } from "../../entities/datas.entity"
import { Usuarios } from "../../entities/usuarios.entity"
import { AppError } from "../../error/appError"

const deleteDatasByUsuarioIdService = async (id:number) => {
    const datasRepository = AppDataSource.getRepository(Datas)
    const usuariosRepository = AppDataSource.getRepository(Usuarios)

    const usuario = await usuariosRepository.findOneBy({id:id})
    if(!usuario) throw new AppError(400,"Usuário não encontrado")

    let idsDatas:number[] = []
    usuario.datas?.map(data => idsDatas.push(data.id))

    idsDatas.map(async d_id => await datasRepository.delete(d_id))

    return true
}

export default deleteDatasByUsuarioIdService