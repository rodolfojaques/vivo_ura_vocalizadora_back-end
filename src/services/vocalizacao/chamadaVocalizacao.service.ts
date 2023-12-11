import axios from "axios";
import { AppDataSource, AppDataSourceHistory } from "../../data-source";
import { VocalizacaoHistory } from "../../../src-new/entities/vocalizacao.history.entity";
import { ReturnVocalizacao } from "../../entities/returnVocalizacao.entity";
import { Usuarios } from "../../entities/usuarios.entity";

const chamadaVocalizacaoService = async (data: any) => {
  const dtFormatado = data.alarme.DATA_APRESENTACAO.slice(0,10) + " " + data.alarme.DATA_APRESENTACAO.slice(11,19)
  
  const vocalizacaoHistoryRepository = AppDataSourceHistory.getRepository(VocalizacaoHistory);

  const returnVocalizacaoRepository = AppDataSource.getRepository(ReturnVocalizacao);

  const usuarioRepository = AppDataSource.getRepository(Usuarios)

  const userId = data.plantonista.id

  const chamadas = async () => {

    const usuario = await usuarioRepository.findOneBy({id:userId})

    const newData = vocalizacaoHistoryRepository.create({
      contact_id: data.plantonista.id,
      plantonista: data.plantonista.nome,
      phone: data.plantonista.tel_cel,
      alarme: data.alarme,
    });      

    await vocalizacaoHistoryRepository.save(newData);

    const output = {
      contacts: [
        {
          name: data.plantonista.nome,
          code: newData.code.toString(),
          phones: [data.plantonista.tel_cel],            
          ALARME: data.alarme.TIPO_ALARME,
          SITE: data.alarme.SITE,
          LOCALIDADE: data.alarme.LOCALIDADE,
          ESTADO: data.alarme.ESTADO,
          TA: data.alarme.TA.toString(),            
          TIPO_REDE: data.alarme.TIPO_REDE,
          DATA_HORA: dtFormatado,
        },
      ],
    };
    console.log(output);

    axios.post("http://186.238.82.229/api/mailing/12/contacts?key=kKoD1X4n", output, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    const monitorando = output.contacts[0].code;

    setTimeout(async () => {
      if(usuario?.emEspera! <= 0){
        await usuarioRepository.update(userId,{emChamada: false})
        await usuarioRepository.update(userId,{emEspera: 0})
      }

      const oneReturnVocalizacao = await returnVocalizacaoRepository.findOneBy({
        code: monitorando,
      });

      const historyVoc = await vocalizacaoHistoryRepository.findOneBy({
        code: Number(monitorando)
      })

      if (oneReturnVocalizacao) {
        if(historyVoc){
          vocalizacaoHistoryRepository.update(historyVoc.id, {
            status: true,
          });            
        }

        return
        
      } else {              

        const newData = vocalizacaoHistoryRepository.create({
        contact_id: data.grupoAtuacao.id,
        plantonista: data.grupoAtuacao.gerente1,
        phone: data.grupoAtuacao.contato_ger1,
        alarme: data.alarme,
        });

        await vocalizacaoHistoryRepository.save(newData);
        const output = {
            contacts: [
                {
                name: data.grupoAtuacao.gerente1,
                code: newData.code.toString(),
                phones: [data.grupoAtuacao.contato_ger1],                    
                ALARME: data.alarme.TIPO_ALARME,
                SITE: data.alarme.SITE,
                LOCALIDADE: data.alarme.LOCALIDADE,
                ESTADO: data.alarme.ESTADO,
                TA: data.alarme.TA.toString(),                    
                TIPO_REDE: data.alarme.TIPO_REDE,
                DATA_HORA: dtFormatado,
                },
            ],
        };
        

        axios.post("http://186.238.82.229/api/mailing/12/contacts?key=kKoD1X4n", output, {
            headers: {
                "Content-Type": "application/json",
            },
        })

        const monitorando = output.contacts[0].code;

        setTimeout(async() => {

          const oneReturnVocalizacao =
          await returnVocalizacaoRepository.findOneBy({
              code: monitorando,
          });

          const historyVoc = await vocalizacaoHistoryRepository.findOneBy({
            code: Number(monitorando)
          })

          if (oneReturnVocalizacao) {  
            if(historyVoc){
              vocalizacaoHistoryRepository.update(historyVoc.id, {
                status: true,
              });            
            }

              return
          } else {
                
            const newData = vocalizacaoHistoryRepository.create({
              contact_id: data.grupoAtuacao.id,
              plantonista: data.grupoAtuacao.gerente2,
              phone: data.grupoAtuacao.contato_ger2,
              alarme: data.alarme,
            });
  
            await vocalizacaoHistoryRepository.save(newData);

            const output = {
              contacts: [
                {
                  name: data.grupoAtuacao.gerente2,
                  code: newData.code.toString(),
                  phones: [data.grupoAtuacao.contato_ger2],                      
                  ALARME: data.alarme.TIPO_ALARME,
                  SITE: data.alarme.SITE,
                  LOCALIDADE: data.alarme.LOCALIDADE,
                  ESTADO: data.alarme.ESTADO,
                  TA: data.alarme.TA.toString(),                      
                  TIPO_REDE: data.alarme.TIPO_REDE,
                  DATA_HORA: dtFormatado,
                },
              ],
            };

            axios.post("http://186.238.82.229/api/mailing/12/contacts?key=kKoD1X4n", output, {
              headers: {
                "Content-Type": "application/json",
              },
            })

            const monitorando = output.contacts[0].code;

            setTimeout(async () => {

              const oneReturnVocalizacao =
                await returnVocalizacaoRepository.findOneBy({
                  code: monitorando,
                });

                const historyVoc = await vocalizacaoHistoryRepository.findOneBy({
                  code: Number(monitorando)
                })

              if (oneReturnVocalizacao) {
                if(historyVoc){
                  vocalizacaoHistoryRepository.update(historyVoc.id, {
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

  if(!data.grupoAtuacao || !data.plantonista){
    const newData = vocalizacaoHistoryRepository.create({
      contact_id: 0,
      plantonista: "Alarme sem plantonista responsavel",
      phone: "Alarme sem plantonista responsavel",
      alarme: data.alarme,
    });

    await vocalizacaoHistoryRepository.save(newData);

    return

  } else if(data.plantonista.emChamada){    
    const emEspDefault = data.plantonista.emEspera +1
    await usuarioRepository.update(userId,{emEspera: emEspDefault})

    const usuario = await usuarioRepository.findOneBy({id:userId})
    
    let delay = 130000 //ms
    let qtdEspera = usuario?.emEspera!

    setTimeout(async () => {
      await usuarioRepository.update(userId,{emEspera: (usuario?.emEspera! -1)})
      const usuarioUp = await usuarioRepository.findOneBy({id:userId})

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
};

export default chamadaVocalizacaoService;
