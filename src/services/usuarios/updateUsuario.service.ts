import { hash } from "bcrypt";
import AppDataSource from "../../data-source";
import { Usuarios } from "../../entities/usuarios.entity";
// import { IUsuarioUpdate } from "../../interfaces/usuarios";
import { AppError } from "../../error/appError";
import { GruposAtuacao } from "../../entities/gruposAtuacao.entity";

const updateUsuarioService = async (id:number,data:any) => {
    if(!!data.gruposAtuacao){

        console.log("console");
        
        if(data.gruposAtuacao === null){
        console.log("entrou");


            const gruposAtuacaoRepository = AppDataSource.getRepository(GruposAtuacao)
            const usuariosRepository = AppDataSource.getRepository(Usuarios)
        
            const usuario = await usuariosRepository.findOneBy({id:id})
            if(!usuario) throw new AppError(400,"Usuário não encontrado")
        
            const grupo = await gruposAtuacaoRepository.findOneBy({id:data.gruposAtuacao})
            if(!grupo) throw new AppError(400,"Grupo não encontrado")
    
            delete data?.id
            delete data?.RE
    
            if(!!data.password) data.password = await hash(data.password, 10)
    
            const usuariosAtualizados = grupo.usuarios.filter(user => user.id !== usuario.id)
            grupo.usuarios = usuariosAtualizados 
    
            await gruposAtuacaoRepository.save(grupo)
    
            delete data?.gruposAtuacao
            await usuariosRepository.update(id,{...data})
    
            const usuarioUpdated = await usuariosRepository.findOneBy({id:id})       
        
            return usuarioUpdated            
        }
        console.log("não");
        
        const gruposAtuacaoRepository = AppDataSource.getRepository(GruposAtuacao)
        const usuariosRepository = AppDataSource.getRepository(Usuarios)
    
        const usuario = await usuariosRepository.findOneBy({id:id})
        if(!usuario) throw new AppError(400,"Usuário não encontrado")
    
        const grupo = await gruposAtuacaoRepository.findOneBy({id:data.gruposAtuacao})
        if(!grupo) throw new AppError(400,"Grupo não encontrado")

        delete data?.id
        delete data?.RE

        if(!!data.password) data.password = await hash(data.password, 10)

        grupo.usuarios = [...grupo.usuarios,usuario]        

        await gruposAtuacaoRepository.save(grupo)

        delete data?.gruposAtuacao
        await usuariosRepository.update(id,{...data})

        const usuarioUpdated = await usuariosRepository.findOneBy({id:id})       
    
        return usuarioUpdated
    }

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