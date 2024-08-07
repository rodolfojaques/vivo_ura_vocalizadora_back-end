import axios from "axios";
import { AppDataSource, AppDataSourceHistory } from "../../data-source";
import { VocalizacaoHistory } from "../../../src-new/entities/vocalizacao.history.entity";
import { ReturnVocalizacao } from "../../entities/returnVocalizacao.entity";
import { Usuarios } from "../../entities/usuarios.entity";
import "dotenv/config";

const returnVocalizacaoRepository = AppDataSource.getRepository(ReturnVocalizacao);    
const vocalizacaoHistoryRepository = AppDataSourceHistory.getRepository(VocalizacaoHistory);
const usuarioRepository = AppDataSource.getRepository(Usuarios)

const chamadaVocalizacaoService = async (data: any) => {
    
  const vocalizacaoHistoryRepository = AppDataSourceHistory.getRepository(VocalizacaoHistory);
  
  const usuarioRepository = AppDataSource.getRepository(Usuarios)
  
  const userId = data?.plantonista?.id

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
      const usuarioIn = await usuarioRepository.findOneBy({id:userId})
      await usuarioRepository.update(userId,{emEspera: (usuarioIn?.emEspera! -1)})
      console.log(usuarioIn?.emEspera!,usuarioIn?.emEspera! -1);
      
      const usuarioUp = await usuarioRepository.findOneBy({id:userId})
      console.log(usuarioUp?.emEspera!);
      

      if(usuarioUp?.emEspera! <= 0){
        await usuarioRepository.update(userId,{emEspera: 0})
        await usuarioRepository.update(userId,{emChamada: false})
        
        chamadas(data,userId)
      } else {
        chamadas(data,userId)
      }

    }, delay * qtdEspera);

  } else {
    await usuarioRepository.update(userId,{emChamada: true})

    chamadas(data,userId)   
  }
};

async function chamadas(data:any,userId:number){

  const usuario = await usuarioRepository.findOneBy({id:userId})

  const newData = vocalizacaoHistoryRepository.create({
    contact_id: data.plantonista.id,
    plantonista: data.plantonista.nome,
    phone: data.plantonista.tel_cel,
    alarme: data.alarme,
  });      

  await vocalizacaoHistoryRepository.save(newData);

  await resquetSincro(data, data.plantonista.nome, newData.code.toString(), data.plantonista.tel_cel)

  const monitorando = newData.code.toString()

  setTimeout(async () => {
    await onCall(usuario!,userId)

    const oneReturnVocalizacao = await returnVocalizacaoRepository.findOneBy({
      code: monitorando,
    });

    const historyVoc = await vocalizacaoHistoryRepository.findOneBy({
      code: Number(monitorando)
    })

    if (oneReturnVocalizacao && historyVoc) {
      
      vocalizacaoHistoryRepository.update(historyVoc.id, {
        status: true,
      }); 
      return
      
    } else {              

      const newData = vocalizacaoHistoryRepository.create({
      contact_id: data.grupoAtuacao.id,
      plantonista: data.grupoAtuacao.gerente1,
      phone: data.grupoAtuacao.contato_ger1,
      alarme: data.alarme,
      });

      await vocalizacaoHistoryRepository.save(newData);

      await resquetSincro(data, data.grupoAtuacao.gerente1, newData.code.toString(), data.grupoAtuacao.contato_ger1)

      const monitorando = newData.code.toString()

      setTimeout(async() => {

        const oneReturnVocalizacao = await returnVocalizacaoRepository.findOneBy({
            code: monitorando,
        });

        const historyVoc = await vocalizacaoHistoryRepository.findOneBy({
          code: Number(monitorando)
        })

        if (oneReturnVocalizacao && historyVoc) {  
          
          vocalizacaoHistoryRepository.update(historyVoc.id, {
            status: true,
          });            
          return
        } else {
              
          const newData = vocalizacaoHistoryRepository.create({
            contact_id: data.grupoAtuacao.id,
            plantonista: data.grupoAtuacao.gerente2,
            phone: data.grupoAtuacao.contato_ger2,
            alarme: data.alarme,
          });

          await vocalizacaoHistoryRepository.save(newData);

          await resquetSincro(data, data.grupoAtuacao.gerente2, newData.code.toString(), data.grupoAtuacao.contato_ger2)

          const monitorando = newData.code.toString()

          setTimeout(async () => {

            const oneReturnVocalizacao = await returnVocalizacaoRepository.findOneBy({
                code: monitorando,
              });

              const historyVoc = await vocalizacaoHistoryRepository.findOneBy({
                code: Number(monitorando)
              })

            if (oneReturnVocalizacao && historyVoc) {
              
              vocalizacaoHistoryRepository.update(historyVoc.id, {
                status: true,
              });            
              return
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

async function onCall(usuario:Usuarios,userId:number){
  if(usuario?.emEspera! <= 0){
    await usuarioRepository.update(userId,{emChamada: false})
    await usuarioRepository.update(userId,{emEspera: 0})        
  }
}

async function resquetSincro(data:any, name:string, code:any, phone:string){
  const dtFormatado = data.alarme.DATA_APRESENTACAO.slice(0,10) + " " + data.alarme.DATA_APRESENTACAO.slice(11,19)

  const output = {
    contacts: [
      {
        name: name,
        code: code,
        phones: [phone],            
        ALARME: data.alarme.TIPO_ALARME,
        SITE: data.alarme.SITE,
        LOCALIDADE: data.alarme.LOCALIDADE,
        ESTADO: data.alarme.ESTADO,
        TA: data.alarme.TA !== null? data.alarme.TA.toString() : 'SEMTA',            
        TIPO_REDE: data.alarme.TIPO_REDE,
        DATA_HORA: dtFormatado,
      },
    ],
  };
  console.log(output);

  axios.post(String(process.env.URL_SINC_SG), output, {
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export default chamadaVocalizacaoService;
