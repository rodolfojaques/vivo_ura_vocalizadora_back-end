import { compare } from "bcrypt";
import AppDataSource from "../../data-source";
import { Usuarios } from "../../entities/usuarios.entity";
import { AppError } from "../../error/appError";
import { IUsuarioLogin } from "../../interfaces/usuarios";

import * as jwt from "jsonwebtoken";

const loginService = async (data:IUsuarioLogin) => {
    const usuariosRepository = AppDataSource.getRepository(Usuarios)

    const usuario = await usuariosRepository.findOneBy({RE:data.RE})
    if(!usuario) throw new AppError(403,"RE ou senha inválidos")
    

    const matchPassword = await compare(data.password, usuario.password!)
    if(!matchPassword) throw new AppError(403,"RE ou senha inválidos")

    const token = jwt.sign(
        {
            nome:usuario.nome,
            RE: usuario.RE,
            perfil: usuario.perfil
        },
        process.env.SECRET_KEY as string,
        {
            subject: usuario.id.toString(),
            expiresIn: "8h"
        }
    )

    return {
        token:token,
        user:usuario
    }
}

export default loginService