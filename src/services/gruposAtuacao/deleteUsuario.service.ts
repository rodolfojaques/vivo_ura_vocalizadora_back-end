import AppDataSource from "../../data-source"
import { GruposAtuacao } from "../../entities/gruposAtuacao.entity"
import { Usuarios } from "../../entities/usuarios.entity"
import { AppError } from "../../error/appError"

const deleteUsuarioService = async (id:number,userId:number) => {
    const gruposAtuacaoRepository = AppDataSource.getRepository(GruposAtuacao)
    const usuariosRepository = AppDataSource.getRepository(Usuarios)

    const usuario = await usuariosRepository.findOneBy({id:userId})
    if(!usuario) throw new AppError(400,"Usuário não encontrado")

    const grupo = await gruposAtuacaoRepository.findOneBy({id:id})
    if(!grupo) throw new AppError(400,"Grupo não encontrado")

    const usuariosAtualizados = grupo.usuarios.filter(user => user.id !== usuario.id)
    grupo.usuarios = [...usuariosAtualizados ]        

    await gruposAtuacaoRepository.save(grupo) 
    
    const grupoUpdated = await gruposAtuacaoRepository.findOneBy({id:id})

    return grupoUpdated
}

export default deleteUsuarioService