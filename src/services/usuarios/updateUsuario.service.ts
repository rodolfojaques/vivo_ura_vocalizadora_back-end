import { hash } from "bcrypt";
import AppDataSource from "../../data-source";
import { Usuarios } from "../../entities/usuarios.entity";
// import { IUsuarioUpdate } from "../../interfaces/usuarios";
import { AppError } from "../../error/appError";
import { GruposAtuacao } from "../../entities/gruposAtuacao.entity";

const updateUsuarioService = async (id:number,data:any) => {

    const usuariosRepository = AppDataSource.getRepository(Usuarios)
    
    const usuarioAlreadyExist = await usuariosRepository.findOneBy({id:id})
    if(!usuarioAlreadyExist) throw new AppError(400,"Usuário não encontrado")

    delete data?.id
    delete data?.RE

    if(!!data.password) data.password = await hash(data.password, 10)

    await usuariosRepository.update(id,{...data})
    const usuarioUpdated = await usuariosRepository.findOneBy({id:id})

    return usuarioUpdated
}

export default updateUsuarioService