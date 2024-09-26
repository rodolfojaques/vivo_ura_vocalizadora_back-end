import { instanceToPlain } from "class-transformer";
import { AppDataSource } from "../../data-source";
import { Usuarios } from "../../entities/usuarios.entity";
import callTemsService from "./callTems.service"
import matchGroupAlarmeService from "./matchGroupAlarm.service"

const vocalizacaoTemsService = async (data:any) => {
    const usuariosRepository = AppDataSource.getRepository(Usuarios)

    const groupsSelected = await matchGroupAlarmeService(data.origin)
    const alarme = await data.alarmeCreated    

    // const dt = new Date();
    // const ano = dt.getFullYear();
    // const mes = String(dt.getMonth() + 1).padStart(2, '0');
    // const dia = String(dt.getDate()).padStart(2, '0');

    // const hora = dt.getHours()
  
    // const diaAtual = `${ano}-${mes}-${dia}` 
    
    // const turnos = () => {
        
    //     if(hora >= 7 && hora < 15){
    //         return "t1"
    //     } else if(hora >= 15 && hora < 23){
    //         return "t2"
    //     } else if(hora >= 23 || hora < 7){
    //         return "t3"
    //     }
    // }  
    // let x:any[] = []
    // let arr:any[] = []

    // const getArr = () => {
    //     return arr
    // }

    // const setArr = (item:any) => {
    //     arr = [...arr, item]
    // }

    // const searchUsers = async () => {

    //     for(let i = 0; i < groupsSelected.length; i++){
    //         const userX = await usuariosRepository.findOneBy({ id: groupsSelected[i].usuario_id })            

    //         if(!!userX) x = [...x, ...userX?.datas?.filter((dia:any) => `${dia.dia.getFullYear()}-${String(dia.dia.getMonth() + 1).padStart(2, '0')}-${String(dia.dia.getDate()).padStart(2, '0')}` === diaAtual && dia.turno.toLowerCase() === turnos())!]
            
    //         if(x.length > 0){   
    //             setArr({
    //                 alarme: alarme,
    //                 plantonista: instanceToPlain(userX), 
    //                 dadosVoc: groupsSelected[i]
    //             })
    //             getArr()
    //             x = []
    //         }
    //     }
    //     return getArr()

    // }

    // if(groupsSelected?.length > 0){

    //     await searchUsers().then((r)=>{            
    //         console.log('Plantonistas disponíveis ==> ', getArr());
    //     })
    // } 

    // while(getArr().length > 0){
    //     if(getArr().length > 0){
    //         if(getArr().length === 1){
    //             const callFunc = await callTemsService(arr[0])   
            
    //             console.log("Apenas 1 plantonista disponível");
    //             console.log(getArr());
                
    //             return callFunc            
    //         }

    //         const random = Math.floor(Math.random() * getArr().length)
            
    //         const callFunc = await callTemsService(getArr()[random])   
            
    //         console.log("Mais do que 1 plantonista disponível");
    //         console.log(getArr());

    //         arr = []
            
    //         return callFunc
    //     } else {
            
    //         const callFunc = await callTemsService({
    //             alarme: alarme,
    //         })  
            
    //         console.log("sem plantonistas disponíveis", groupsSelected);

    //         arr = []
    //         return callFunc
    //     }        
    // }

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