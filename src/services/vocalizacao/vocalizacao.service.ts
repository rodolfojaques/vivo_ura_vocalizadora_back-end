import { In } from "typeorm";
import AppDataSource from "../../data-source"
import { GruposAlarmes } from "../../entities/gruposAlarmes.entity"

const vocalizacaoService = async (data:any) => {

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

    // let buscaGrp_1:GruposAlarmes[] = [];
    // let buscaGrp_2:GruposAlarmes[] = [];
    // let buscaGrp_3:GruposAlarmes[] = [];
    // let buscaGrp_4:GruposAlarmes[] = [];
    // let buscaGrp_5:GruposAlarmes[] = [];
    // let buscaGrp_6:GruposAlarmes[] = [];

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
    }

    // const allGruposAlarmes = await gruposAlarmesRepository.find()    

    // allGruposAlarmes.forEach((grpAlm)=> {
    //     grpAlm.tiposAlarmes?.forEach((tipos)=> {
    //         if(
    //             tipos.uf === data.ESTADO
    //             && tipos.tipoAlarme === data.TIPO_ALARME
    //             && tipos.site === data.SITE
    //             && tipos.localidade === data.LOCALIDADE
    //         ){
    //             buscaGrp_1.push(grpAlm)

    //         } else if(
    //             tipos.uf === data.ESTADO
    //             && tipos.site === data.SITE
    //             && tipos.localidade === data.LOCALIDADE
    //             && tipos.classificacao === data.CLASSIFICACAO
    //         ){
    //             buscaGrp_2.push(grpAlm)

    //         } else if(
    //             tipos.uf === data.ESTADO
    //             && tipos.site === data.SITE
    //             && tipos.localidade === data.LOCALIDADE
    //         ){
    //             buscaGrp_3.push(grpAlm)

    //         } else if(
    //             tipos.uf === data.ESTADO
    //             && tipos.tipoAlarme === data.TIPO_ALARME
    //             && tipos.classificacao === data.CLASSIFICACAO
    //         ){
    //             buscaGrp_4.push(grpAlm)

    //         } else if(
    //             tipos.uf === data.ESTADO
    //             && tipos.tipoAlarme === data.TIPO_ALARME
    //         ){
    //             console.log(data.CLASSIFICACAO, tipos.classificacao);
                
    //             buscaGrp_5.push(grpAlm)

    //         } else if(
    //             tipos.uf === data.ESTADO
    //         ){
    //             buscaGrp_6.push(grpAlm)
    //         }
    //     })
    // })

    // console.log(buscaGrp_1);
    // console.log(buscaGrp_2);
    // console.log(buscaGrp_3);
    // console.log(buscaGrp_4);
    // console.log(buscaGrp_5);
    // console.log(buscaGrp_6);
    

    // if(buscaGrp_1[0] !== undefined){
    //     buscaGrp_1.forEach(grpAlm => {
    //         grpAlm.gruposAtuacao.forEach(grp => {
    //             grp.usuarios.forEach((user,i) => {
    //                 const find = user.datas?.find(dia =>`${dia.dia.getFullYear()}-${String(dia.dia.getMonth() + 1).padStart(2, '0')}-${String(dia.dia.getDate()).padStart(2, '0')}` === diaAtual && dia.turno.toLowerCase() === turnos())
    //                 if(find != undefined) {
    //                     responsavel = user
    //                     grupoResp = grp
                        
    //                     return {
    //                         alarme: data,
    //                         grupoAtuacao: grupoResp,
    //                         plantonista: responsavel
    //                     }
    //                 }
    //             })
    //         })
    //     });

    //     console.log("repescagem 1");
    //     console.log({
    //             alarme: data,
    //             grupoAtuacao: grupoResp,
    //             plantonista: responsavel
    //         });
    //     return {
    //         alarme: data,
    //         grupoAtuacao: grupoResp,
    //         plantonista: responsavel
    //     }
    // } 
    
    // if(buscaGrp_2[0] !== undefined){
    //     buscaGrp_2.forEach(grpAlm => {
    //         grpAlm.gruposAtuacao.forEach(grp => {
    //             grp.usuarios.forEach((user,i) => {
    //                 const find = user.datas?.find(dia =>`${dia.dia.getFullYear()}-${String(dia.dia.getMonth() + 1).padStart(2, '0')}-${String(dia.dia.getDate()).padStart(2, '0')}` === diaAtual && dia.turno.toLowerCase() === turnos())
    //                 if(find != undefined) {
    //                     responsavel = user
    //                     grupoResp = grp
                        
    //                     return {
    //                         alarme: data,
    //                         grupoAtuacao: grupoResp,
    //                         plantonista: responsavel
    //                     }
    //                 }
    //             })
    //         })
    //     });

    //     console.log("repescagem 2");
    //     console.log({
    //             alarme: data,
    //             grupoAtuacao: grupoResp,
    //             plantonista: responsavel
    //         });
    //     return {
    //         alarme: data,
    //         grupoAtuacao: grupoResp,
    //         plantonista: responsavel
    //     }
    // } 
    
    // if(buscaGrp_3[0] !== undefined){
    //     buscaGrp_3.forEach(grpAlm => {
    //         grpAlm.gruposAtuacao.forEach(grp => {
    //             grp.usuarios.forEach((user,i) => {
    //                 const find = user.datas?.find(dia =>`${dia.dia.getFullYear()}-${String(dia.dia.getMonth() + 1).padStart(2, '0')}-${String(dia.dia.getDate()).padStart(2, '0')}` === diaAtual && dia.turno.toLowerCase() === turnos())
    //                 if(find != undefined) {
    //                     responsavel = user
    //                     grupoResp = grp
                        
    //                     return {
    //                         alarme: data,
    //                         grupoAtuacao: grupoResp,
    //                         plantonista: responsavel
    //                     }
    //                 }
    //             })
    //         })
    //     });

    //     console.log("repescagem 3");
    //     console.log({
    //             alarme: data,
    //             grupoAtuacao: grupoResp,
    //             plantonista: responsavel
    //         });
    //     return {
    //         alarme: data,
    //         grupoAtuacao: grupoResp,
    //         plantonista: responsavel
    //     }
    // } 
    
    // if(buscaGrp_4[0] !== undefined){
    //     buscaGrp_4.forEach(grpAlm => {
    //         grpAlm.gruposAtuacao.forEach(grp => {
    //             grp.usuarios.forEach((user,i) => {
    //                 const find = user.datas?.find(dia =>`${dia.dia.getFullYear()}-${String(dia.dia.getMonth() + 1).padStart(2, '0')}-${String(dia.dia.getDate()).padStart(2, '0')}` === diaAtual && dia.turno.toLowerCase() === turnos())
    //                 if(find != undefined) {
    //                     responsavel = user
    //                     grupoResp = grp
                        
    //                     return {
    //                         alarme: data,
    //                         grupoAtuacao: grupoResp,
    //                         plantonista: responsavel
    //                     }
    //                 }
    //             })
    //         })
    //     });

    //     console.log("repescagem 4");
    //     console.log({
    //             alarme: data,
    //             grupoAtuacao: grupoResp,
    //             plantonista: responsavel
    //         });
    //     return {
    //         alarme: data,
    //         grupoAtuacao: grupoResp,
    //         plantonista: responsavel
    //     }
    // } 
    
    // if(buscaGrp_5[0] !== undefined){
    //     buscaGrp_5.forEach(grpAlm => {
    //         grpAlm.gruposAtuacao.forEach(grp => {
    //             grp.usuarios.forEach((user,i) => {
    //                 const find = user.datas?.find(dia =>`${dia.dia.getFullYear()}-${String(dia.dia.getMonth() + 1).padStart(2, '0')}-${String(dia.dia.getDate()).padStart(2, '0')}` === diaAtual && dia.turno.toLowerCase() === turnos())
    //                 if(find != undefined) {
    //                     responsavel = user
    //                     grupoResp = grp
                        
    //                     return {
    //                         alarme: data,
    //                         grupoAtuacao: grupoResp,
    //                         plantonista: responsavel
    //                     }
    //                 }
    //             })
    //         })
    //     });

    //     console.log("repescagem 5");
    //     console.log({
    //             alarme: data,
    //             grupoAtuacao: grupoResp,
    //             plantonista: responsavel
    //         });
    //     return {
    //         alarme: data,
    //         grupoAtuacao: grupoResp,
    //         plantonista: responsavel
    //     }
    // } 
    
    // if(buscaGrp_6[0] !== undefined){
    //     buscaGrp_6.forEach(grpAlm => {
    //         grpAlm.gruposAtuacao.forEach(grp => {
    //             grp.usuarios.forEach((user,i) => {
    //                 const find = user.datas?.find(dia =>`${dia.dia.getFullYear()}-${String(dia.dia.getMonth() + 1).padStart(2, '0')}-${String(dia.dia.getDate()).padStart(2, '0')}` === diaAtual && dia.turno.toLowerCase() === turnos())
    //                 if(find != undefined) {
    //                     responsavel = user
    //                     grupoResp = grp
                        
    //                     return {
    //                         alarme: data,
    //                         grupoAtuacao: grupoResp,
    //                         plantonista: responsavel
    //                     }
    //                 }
    //             })
    //         })
    //     });

    //     console.log("repescagem 6");
    //     console.log({
    //             alarme: data,
    //             grupoAtuacao: grupoResp,
    //             plantonista: responsavel
    //         });
    //     return {
    //         alarme: data,
    //         grupoAtuacao: grupoResp,
    //         plantonista: responsavel
    //     }
    // }
}

export default vocalizacaoService