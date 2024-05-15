import { AppDataSource } from "../../data-source";
import { Usuarios } from "../../entities/usuarios.entity";
import callTemsService from "./callTems.service"
import matchGroupAlarmeService from "./matchGroupAlarm.service"

const vocalizacaoTemsService = async (data:any) => {
    const groupsSelected = await matchGroupAlarmeService(data)

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
    const plantonistas = await usuariosRepository.find()
    
    if(groupsSelected?.plantonista?.length > 0){
        console.log(">>>>>>> plantonista encontrado");
        console.log(groupsSelected?.plantonista);
        const array:any = []
        const x = groupsSelected.plantonista.map((data:any) => {
            
            const plantonistasSelected = plantonistas.find((user:any) => user.id === data.id)
            if(plantonistasSelected != undefined){
                console.log("logzera",plantonistasSelected);
                array.push(plantonistasSelected)
                
            }
            return array
        })
        console.log(">>>>> x",x);
        
        
        

        if(!!plantonistas){
            console.log(">>>>>>>>> plantonista encontrado 2 if");

            if(plantonistas?.length === 1){                
                console.log(">>>> somente um plantonista encontrado");
                const plantonista = plantonistas[0]
                return plantonista
            }

            const random = Math.floor(Math.random() * plantonistas?.length)
            const plantonista = plantonistas[random]

            // await callTemsService({}) // substituir {} pelo objeto correto
            return plantonista
        }
        console.log("passou reto");
        
        return null
    }  
    
    // if(groupsSelected?.plantonista?.length > 0){
    //     console.log(">>>>>>> plantonista encontrado");
    //     console.log(groupsSelected?.plantonista);
        
    //     const plantonistas = groupsSelected?.plantonista.forEach(async(user:any) => {
    //         const plantonista_x = await AppDataSource.getRepository(Usuarios).findOneBy({id:user.id})
    //         console.log(plantonista_x?.datas);
    //         console.log(plantonista_x);
            
    //         const filter = plantonista_x?.datas?.filter((dia:any) => `${dia.dia.getFullYear()}-${String(dia.dia.getMonth() + 1).padStart(2, '0')}-${String(dia.dia.getDate()).padStart(2, '0')}` === diaAtual && dia.turno.toLowerCase() === turnos())
            
    //         console.log(">>>>> filter",filter);
            
    //         if(filter != undefined && filter?.length > 0) return plantonistas
    //         else return "erro em comparativo de datas"
    //     })

    //     if(!!plantonistas){
    //         console.log(">>>>>>>>> plantonista encontrado 2 if");

    //         if(plantonistas?.length === 1){                
    //             console.log(">>>> somente um plantonista encontrado");
    //             const plantonista = plantonistas[0]
    //             return plantonista
    //         }

    //         const random = Math.floor(Math.random() * plantonistas?.length)
    //         const plantonista = plantonistas[random]

    //         // await callTemsService({}) // substituir {} pelo objeto correto
    //         return plantonista
    //     }
    //     console.log("passou reto");
        
    //     return null
    // }
}

export default vocalizacaoTemsService