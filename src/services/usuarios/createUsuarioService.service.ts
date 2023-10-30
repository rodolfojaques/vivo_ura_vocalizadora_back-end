import {AppDataSource} from "../../data-source";
import { Usuarios } from "../../entities/usuarios.entity";
import { AppError } from "../../error/appError";
import { IUsuarioReq } from "../../interfaces/usuarios";

const createUsuarioService = async (usuarioData:IUsuarioReq) => {
    const usuarioRepository = AppDataSource.getRepository(Usuarios)

    const usuarioAlreadyExist = await usuarioRepository.findOneBy({RE:usuarioData.RE})

    if (!!usuarioAlreadyExist) throw new AppError(400, "User already exists")

    const newUsuario = usuarioRepository.create({...usuarioData})
    await usuarioRepository.save(newUsuario)
    
    return newUsuario
}

export default createUsuarioService