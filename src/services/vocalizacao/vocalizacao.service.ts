import { In } from "typeorm";
import AppDataSource from "../../data-source"
import { GruposAlarmes } from "../../entities/gruposAlarmes.entity"

const vocalizacaoService = async (data:any) => {

    const dt = new Date();
    const ano = dt.getFullYear();
    const mes = String(dt.getMonth() + 1).padStart(2, '0');
    const dia = String(dt.getDate()).padStart(2, '0');
  
    const diaAtual = `${ano}-${mes}-${dia}`
    
    
    const gruposAlarmesRepository = AppDataSource.getRepository(GruposAlarmes)
    const parametrosPesq = [
        data.UF,
        data.TIPO_ALARME,
        data.SITE,
        data.LOCALIDADE,
        data.CLASSIFICACAO
    ]

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
    console.log()
    console.log(data);

    let grupoResp;
    let responsavel;

    if(!!grupoAlarmeResponsavel){

        if(grupoAlarmeResponsavel.gruposAtuacao.length == 1){
            grupoAlarmeResponsavel.gruposAtuacao[0].usuarios.forEach((user,i) => {
                const find = user.datas?.find(dia =>`${dia.dia.getFullYear()}-${String(dia.dia.getMonth() + 1).padStart(2, '0')}-${String(dia.dia.getDate()).padStart(2, '0')}` === diaAtual)
                if(find != undefined) {
                    responsavel = user
                    grupoResp = grupoAlarmeResponsavel.gruposAtuacao[0]
                    
                    return
                }
            })
            console.log(responsavel);
            console.log(grupoResp);
            
            return
        }
        
        grupoAlarmeResponsavel.gruposAtuacao.forEach((grp)=>{
            grp.usuarios.forEach((user,i) => {
                const find = user.datas?.find(dia =>`${dia.dia.getFullYear()}-${String(dia.dia.getMonth() + 1).padStart(2, '0')}-${String(dia.dia.getDate()).padStart(2, '0')}` === diaAtual)
                if(find != undefined) {
                    responsavel = user
                    grupoResp = grp
                    
                    return
                }
            })
        })
        console.log(responsavel);
        console.log(grupoResp);
    }

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>console log<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>console log<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>console log<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")

    // const gruposAlarmesResp = await gruposAlarmesRepository.findBy({
    //     tiposAlarmes:In(parametrosPesq)
    // })

    // console.log(gruposAlarmesResp);
    

}

export default vocalizacaoService