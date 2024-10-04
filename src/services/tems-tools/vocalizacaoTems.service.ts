import { instanceToPlain } from "class-transformer";
import { AppDataSource } from "../../data-source";
import { Usuarios } from "../../entities/usuarios.entity";
import callTemsService from "./callTems.service"
import matchGroupAlarmeService from "./matchGroupAlarm.service"

const vocalizacaoTemsService = async (data:any) => {
    const usuariosRepository = AppDataSource.getRepository(Usuarios)

    const groupsSelected = await matchGroupAlarmeService(data.origin)
    const alarme = await data.alarmeCreated 

    if(groupsSelected?.length > 0){
        if(groupsSelected.length === 1){
            const userX = await usuariosRepository.findOneBy({ id: groupsSelected[0].usuario_id })
            const callFunc = await callTemsService({
                alarme: alarme,
                plantonista: instanceToPlain(userX), 
                dadosVoc: groupsSelected[0]
            })   
        
            console.log("1 plantonista disponível");
            console.log(groupsSelected);
            
            return callFunc         
        } else {
            const random = Math.floor(Math.random() * groupsSelected.length)

            const userX = await usuariosRepository.findOneBy({ id: groupsSelected[random].usuario_id })
            
            const callFunc = await callTemsService({
                alarme: alarme,
                plantonista: instanceToPlain(userX), 
                dadosVoc: groupsSelected[random]
            })   
            
            console.log(`${groupsSelected?.length} plantonistas disponíveis`);
            console.log(groupsSelected);
            
            return callFunc            
        }
    }

    if(groupsSelected?.length === 0){
        const callFunc = await callTemsService({
            alarme: alarme,
        })  
        
        console.log("sem plantonistas disponíveis", groupsSelected);

        return callFunc
    }

}

export default vocalizacaoTemsService