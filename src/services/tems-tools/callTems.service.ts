import axios from "axios";
import { VocalizacaoHistoryTems } from "../../../src-temsHist/entities/vocalizacaoTems.history.entity";
import { AppDataSource, AppDataSourceTemsHistory } from "../../data-source";
import { Usuarios } from "../../entities/usuarios.entity";
import { ReturnVocalizacaoTems } from "../../entities/returnVocalizacaoTems.entity";

const callTemsService = async (data:any) => {
    try {
        console.log("callTemsService",data)
        const alarme = data.alarme

        const dtFormat = new Date(data.alarme.firstSeen)
        const isoFormat = dtFormat.toISOString()
        const dtFormatado = isoFormat.slice(0,10) + " " + isoFormat.slice(11,19)
    
        const vocalizacaoHistoryTemsRepository = AppDataSourceTemsHistory.getRepository(VocalizacaoHistoryTems);
        
        const returnVocalizacaoTemsRepository = AppDataSource.getRepository(ReturnVocalizacaoTems);
        
        const usuarioRepository = AppDataSource.getRepository(Usuarios)
        
        const userId = data?.plantonista?.id
        
        const chamadas = async () => {
      
          const usuario = await usuarioRepository.findOneBy({id:userId})
      
          const newData = vocalizacaoHistoryTemsRepository.create({
            contact_id: data.plantonista.id,
            plantonista: data.plantonista.nome,
            phone: data.plantonista.tel_cel,
            alarme: alarme,
          });      
      
          await vocalizacaoHistoryTemsRepository.save(newData);
      
          const output = {
            contacts: [
              {
                name: data.plantonista.nome,
                code: newData.code.toString(),
                phones: [data.plantonista.tel_cel],            
                ALARME: data.alarme.persistent_tipoAlarme,
                SEVERITY: data.alarme.severity,
                TIPO_PLANTA: data.alarme.persistent_tipoPlanta,
                LOCALIDADE: data.alarme.persistent_localidadeSigla,
                ESTADO: data.alarme.persistent_estadoSigla,
                TA: data.alarme.persistent_ta !== null? data.alarme.persistent_ta.toString() : 'SEMTA',            
                TIPO_REDE: data.alarme.persistent_tipoRede,
                DATA_HORA: dtFormatado,
              },
            ],
          };
          console.log(output);
      
        //   axios.post("http://186.238.82.229/api/mailing/12/contacts?key=kKoD1X4n", output, {
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   })
      
          const monitorando = output.contacts[0].code;
      
          setTimeout(async () => {
            if(usuario?.emEspera! <= 0){
              await usuarioRepository.update(userId,{emChamada: false})
              await usuarioRepository.update(userId,{emEspera: 0})        
            }
      
            const oneReturnVocalizacao = await returnVocalizacaoTemsRepository.findOneBy({
              code: monitorando,
            });
      
            const historyVoc = await vocalizacaoHistoryTemsRepository.findOneBy({
              code: Number(monitorando)
            })
      
            if (oneReturnVocalizacao) {
              if(historyVoc){
                vocalizacaoHistoryTemsRepository.update(historyVoc.id, {
                  status: true,
                });            
              }
      
              return
              
            } else {              
      
              const newData = vocalizacaoHistoryTemsRepository.create({
              contact_id: data.dadosVoc.id_grupo_atuacao,
              plantonista: data.dadosVoc.gerente1,
              phone: data.dadosVoc.contato_ger1,
              alarme: alarme,
              });
      
              await vocalizacaoHistoryTemsRepository.save(newData);
      
              const output = {
                contacts: [
                  {
                  name: data.dadosVoc.gerente1,
                  code: newData.code.toString(),
                  phones: [data.dadosVoc.contato_ger1],                    
                  ALARME: data.alarme.persistent_tipoAlarme,
                  SEVERITY: data.alarme.severity,
                  TIPO_PLANTA: data.alarme.persistent_tipoPlanta,
                  LOCALIDADE: data.alarme.persistent_localidadeSigla,
                  ESTADO: data.alarme.persistent_estadoSigla,
                  TA: data.alarme.persistent_ta !== null? data.alarme.persistent_ta.toString() : 'SEMTA',                    
                  TIPO_REDE: data.alarme.persistent_tipoRede,
                  DATA_HORA: dtFormatado,
                  },
                ],
              };
              
      
            //   axios.post("http://186.238.82.229/api/mailing/12/contacts?key=kKoD1X4n", output, {
            //     headers: {
            //       "Content-Type": "application/json",
            //     },
            //   })
      
              const monitorando = output.contacts[0].code;
      
              setTimeout(async() => {
      
                const oneReturnVocalizacao = await returnVocalizacaoTemsRepository.findOneBy({
                    code: monitorando,
                });
      
                const historyVoc = await vocalizacaoHistoryTemsRepository.findOneBy({
                  code: Number(monitorando)
                })
      
                if (oneReturnVocalizacao) {  
                  if(historyVoc){
                    vocalizacaoHistoryTemsRepository.update(historyVoc.id, {
                      status: true,
                    });            
                  }
      
                    return
                } else {
                      
                  const newData = vocalizacaoHistoryTemsRepository.create({
                    contact_id: data.dadosVoc.id_grupo_atuacao,
                    plantonista: data.dadosVoc.gerente2,
                    phone: data.dadosVoc.contato_ger2,
                    alarme: alarme,
                  });
        
                  await vocalizacaoHistoryTemsRepository.save(newData);
      
                  const output = {
                    contacts: [
                      {
                        name: data.dadosVoc.gerente2,
                        code: newData.code.toString(),
                        phones: [data.dadosVoc.contato_ger2],                      
                        ALARME: data.alarme.persistent_tipoAlarme,
                        SEVERITY: data.alarme.severity,
                        TIPO_PLANTA: data.alarme.persistent_tipoPlanta,
                        LOCALIDADE: data.alarme.persistent_localidadeSigla,
                        ESTADO: data.alarme.persistent_estadoSigla,
                        TA: data.alarme.persistent_ta !== null? data.alarme.persistent_ta.toString() : 'SEMTA',                      
                        TIPO_REDE: data.alarme.persistent_tipoRede,
                        DATA_HORA: dtFormatado,
                      },
                    ],
                  };
      
                //   axios.post("http://186.238.82.229/api/mailing/12/contacts?key=kKoD1X4n", output, {
                //     headers: {
                //       "Content-Type": "application/json",
                //     },
                //   })
      
                  const monitorando = output.contacts[0].code;
      
                  setTimeout(async () => {
      
                    const oneReturnVocalizacao = await returnVocalizacaoTemsRepository.findOneBy({
                        code: monitorando,
                      });
      
                      const historyVoc = await vocalizacaoHistoryTemsRepository.findOneBy({
                        code: Number(monitorando)
                      })
      
                    if (oneReturnVocalizacao) {
                      if(historyVoc){
                        vocalizacaoHistoryTemsRepository.update(historyVoc.id, {
                          status: true,
                        });            
                      }
                    }
                    console.log("acabou o tempo");
                    console.log();
                    console.log("Gerente2 não atendeu", " code: ", monitorando);
                    console.log();
                    console.log("não atendido");
                  }, 320000);
                }
                console.log("acabou o tempo");
                console.log();
                console.log("Gerente1 não atendeu", " code: ", monitorando);
                console.log();
                console.log("proximo contado");
                }, 320000);
            }
            console.log("acabou o tempo");
            console.log();
            console.log("plantonista não atendeu", " code: ", monitorando);
            console.log();
            console.log("proximo contado");
          }, 320000);    
        };  
      
        if(!data.dadosVoc || !data.plantonista){
      
          const newData = vocalizacaoHistoryTemsRepository.create({
            contact_id: 0,
            plantonista: "Alarme sem plantonista responsavel",
            phone: "Alarme sem plantonista responsavel",
            alarme: alarme,
          });
      
          await vocalizacaoHistoryTemsRepository.save(newData);
      
          return
      
        } else if(data.plantonista.emChamada){   
          const emEspDefault = data.plantonista.emEspera +1
          await usuarioRepository.update(userId,{emEspera: emEspDefault})
      
          const usuario = await usuarioRepository.findOneBy({id:userId})
          
          let delay = 130000 //ms
          let qtdEspera = usuario?.emEspera!
      
          setTimeout(async () => {
            const usuarioIn = await usuarioRepository.findOneBy({id:userId})
            await usuarioRepository.update(userId,{emEspera: (usuarioIn?.emEspera! -1)})
            console.log(usuarioIn?.emEspera!,usuarioIn?.emEspera! -1);
            
            const usuarioUp = await usuarioRepository.findOneBy({id:userId})
            console.log(usuarioUp?.emEspera!);
            
      
            if(usuarioUp?.emEspera! <= 0){
              await usuarioRepository.update(userId,{emEspera: 0})
              await usuarioRepository.update(userId,{emChamada: false})
              
              chamadas()
            } else {
              chamadas()
            }
      
          }, delay * qtdEspera);
      
        } else {
          await usuarioRepository.update(userId,{emChamada: true})
      
          chamadas()   
        }

        
        return alarme
            
    } catch (error) {
        console.log("callTemsService_error: ", error)
    }
}

export default callTemsService