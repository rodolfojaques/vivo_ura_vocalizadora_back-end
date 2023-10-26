import AppDataSource from "../../data-source"
import { GruposAlarmes } from "../../entities/gruposAlarmes.entity"

const vocalizacaoService = async (data:any) => {
    
    const gruposAlarmesRepository = AppDataSource.getRepository(GruposAlarmes)

    const grupoAlarmeResponsavel = await gruposAlarmesRepository.findOne({
        relations: {tiposAlarmes:true},
        where:{
            tiposAlarmes:{
                uf: data.UF,
                tipoAlarme: data.TIPO_ALARME,
                site: data.SITE,
                localidade: data.LOCALIDADE,
                classificacao: data.CLASSIFICACAO
            }
        }
    })

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>console log<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>console log<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>console log<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    console.log()
    console.log(data);
    

    if(!!grupoAlarmeResponsavel){
        const dt = new Date()
        const dia = dt.getDay()
        const mes = dt.getMonth()
        const ano = dt.getFullYear()
        const hoje = ``

        console.log(grupoAlarmeResponsavel);

        if(grupoAlarmeResponsavel.gruposAtuacao.length == 1){
            console.log(grupoAlarmeResponsavel)
            console.log(grupoAlarmeResponsavel.gruposAtuacao[0])
            return
        }
        
        grupoAlarmeResponsavel.gruposAtuacao.forEach((grp)=>{
            grp.usuarios.forEach((user)=> {

                // user.datas?.filter(data=> data.dia.)
            })
        })
    }

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>console log<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>console log<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>console log<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")


}

export default vocalizacaoService