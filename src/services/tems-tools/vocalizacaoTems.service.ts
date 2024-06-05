import { instanceToPlain } from "class-transformer";
import { AppDataSource } from "../../data-source";
import { Usuarios } from "../../entities/usuarios.entity";
import callTemsService from "./callTems.service"
import matchGroupAlarmeService from "./matchGroupAlarm.service"

const vocalizacaoTemsService = async (data:any) => {
    const groupsSelected = await matchGroupAlarmeService(data.origin)
    const alarme = data.alarmeCreated

    const dt = new Date();
    const ano = dt.getFullYear();
    const mes = String(dt.getMonth() + 1).padStart(2, '0');
    const dia = String(dt.getDate()).padStart(2, '0');

    const hora = dt.getHours()
  
    const diaAtual = `${ano}-${mes}-${dia}` 
    
    const turnos = () => {
        
        if(hora >= 7 && hora < 15){
            return "t1"
        } else if(hora >= 15 && hora < 22){
            return "t2"
        } else if(hora >= 22){
            return "t3"
        }
    }  

    const usuariosRepository = AppDataSource.getRepository(Usuarios)
    let forReturn
    let x:any[] = []
    let arr:any[] = []

    if(groupsSelected?.plantonista?.length > 0){
        const plantonistas = await usuariosRepository.find({ where: { id: groupsSelected?.plantonista.id } })

        plantonistas.forEach((user:any)=>{
            x = [...x, ...user?.datas?.filter((dia:any) => `${dia.dia.getFullYear()}-${String(dia.dia.getMonth() + 1).padStart(2, '0')}-${String(dia.dia.getDate()).padStart(2, '0')}` === diaAtual && dia.turno.toLowerCase() === turnos())]
            
            if(x.length > 0){  
                if(user.datas.length > 0){              
                    arr.push(forReturn = {
                        alarme: alarme,
                        plantonista: instanceToPlain(user), 
                        dadosVoc: groupsSelected.dados_vocalizacao.filter((voc:any) => voc.id_plantonista === user.id)
                    })
                    x = []
                    return arr
                }
            }
        })
    } 

    if(forReturn !== undefined){
        if(arr.length === 1){
            const callFunc = await callTemsService(arr[0]) 
            return callFunc            
        }

        const random = Math.floor(Math.random() * arr.length)
        
        const callFunc = await callTemsService(arr[random])        
        
        return callFunc
    } else {
        
        const callFunc = await callTemsService({
            alarme: alarme,
        })

        return callFunc
    }
}

export default vocalizacaoTemsService