import { VocalizacaoHistory } from "../../../src-new/entities/vocalizacao.history.entity";
import { AppDataSource, AppDataSourceHistory } from "../../data-source";
import { GruposAlarmes } from "../../entities/gruposAlarmes.entity";

const vocalizacaoService = async (data: any) => {
    const vocalizacaoHistoryRepository = AppDataSourceHistory.getRepository(VocalizacaoHistory);

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
    
    const gruposAlarmesRepository = AppDataSource.getRepository(GruposAlarmes)

    const grupoAlarmeResponsavel = await gruposAlarmesRepository.findOne({
        relations: {tiposAlarmes:true},
        where:{
            tiposAlarmes:{
                uf: data.ESTADO,
                tipoAlarme: data.TIPO_ALARME,
                site: data.SITE,
                localidade: data.LOCALIDADE,
                classificacao: data.CLASSIFICACAO
            }
        }
    })
    
    let grupoResp;
    let responsavel;

    if(!!grupoAlarmeResponsavel){

        if(grupoAlarmeResponsavel.gruposAtuacao.length == 1){
            grupoAlarmeResponsavel.gruposAtuacao[0].usuarios.forEach((user,i) => {
                const find = user.datas?.find(dia =>`${dia.dia.getFullYear()}-${String(dia.dia.getMonth() + 1).padStart(2, '0')}-${String(dia.dia.getDate()).padStart(2, '0')}` === diaAtual && dia.turno.toLowerCase() === turnos())
                if(find != undefined) {
                    responsavel = user
                    grupoResp = grupoAlarmeResponsavel.gruposAtuacao[0]
                    
                    return {
                        alarme: data,
                        grupoAtuacao: grupoResp,
                        plantonista: responsavel
                    }
                }
            })
            
            return {
                alarme: data,
                grupoAtuacao: grupoResp,
                plantonista: responsavel
            }
        }
        
        grupoAlarmeResponsavel.gruposAtuacao.forEach((grp)=>{
            grp.usuarios.forEach((user,i) => {
                const find = user.datas?.find(dia =>`${dia.dia.getFullYear()}-${String(dia.dia.getMonth() + 1).padStart(2, '0')}-${String(dia.dia.getDate()).padStart(2, '0')}` === diaAtual && dia.turno.toLowerCase() === turnos())
                if(find != undefined) {
                    responsavel = user
                    grupoResp = grp
                    
                    return {
                        alarme: data,
                        grupoAtuacao: grupoResp,
                        plantonista: responsavel
                    }
                }
            })
        })

        return {
            alarme: data,
            grupoAtuacao: grupoResp,
            plantonista: responsavel
        }
    } else {
        
        const newData = vocalizacaoHistoryRepository.create({
            contact_id: 0,
            plantonista: "Alarme sem plantonista responsavel",
            phone: "Alarme sem plantonista responsavel",
            alarme: data,
        });
      
        await vocalizacaoHistoryRepository.save(newData);
      
        return
    }
}


export default vocalizacaoService;
