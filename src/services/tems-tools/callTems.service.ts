import axios from "axios";
import { VocalizacaoHistoryTems } from "../../../src-temsHist/entities/vocalizacaoTems.history.entity";
import { AppDataSource, AppDataSourceTemsHistory } from "../../data-source";
import { Usuarios } from "../../entities/usuarios.entity";
import { ReturnVocalizacaoTems } from "../../entities/returnVocalizacaoTems.entity";
import "dotenv/config";
    
const vocalizacaoHistoryTemsRepository = AppDataSourceTemsHistory.getRepository(VocalizacaoHistoryTems);

const returnVocalizacaoTemsRepository = AppDataSource.getRepository(ReturnVocalizacaoTems);

const usuarioRepository = AppDataSource.getRepository(Usuarios)

const callTemsService = async (data:any) => {
    try {
        const alarme = data.alarme
        
        const userId = data?.plantonista?.id  
      
        if(!data.dadosVoc || !data.plantonista){
      
          const newData = vocalizacaoHistoryTemsRepository.create({
            contact_id: 0,
            plantonista: "Alarme sem plantonista responsavel",
            phone: "Alarme sem plantonista responsavel",
            alarme: alarme,
          });
      
          await vocalizacaoHistoryTemsRepository.save(newData);
      
          return data
      
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
              
              chamadas(data,userId,alarme)
            } else {
              chamadas(data,userId,alarme)
            }
      
          }, delay * qtdEspera);
      
        } else {
          await usuarioRepository.update(userId,{emChamada: true})
      
          chamadas(data,userId,alarme)   
        }

        
        return data
            
    } catch (error) {
        console.log("callTemsService_error: ", error)
    }
}  

async function chamadas(data:any,userId:number,alarme:any){
      
  const usuario = await usuarioRepository.findOneBy({id:userId})

  const newData = vocalizacaoHistoryTemsRepository.create({
    contact_id: data.plantonista.id,
    plantonista: data.plantonista.nome,
    phone: data.plantonista.tel_cel,
    alarme: alarme,
  });      

  await vocalizacaoHistoryTemsRepository.save(newData);

  await resquetSincro(data, data.plantonista.nome, newData.code.toString(), data.plantonista.tel_cel)

  const monitorando = newData.code.toString();

  setTimeout(async () => {
    onCall(usuario!,userId)

    const oneReturnVocalizacao = await returnVocalizacaoTemsRepository.findOneBy({
      code: monitorando,
    });

    const historyVoc = await vocalizacaoHistoryTemsRepository.findOneBy({
      code: Number(monitorando)
    })

    if (oneReturnVocalizacao && historyVoc) {
      
      vocalizacaoHistoryTemsRepository.update(historyVoc.id, {
        status: true,
      });            
      return
      
    } else {              

      const newData = vocalizacaoHistoryTemsRepository.create({
      contact_id: data.dadosVoc[0].id_grupo_atuacao,
      plantonista: data.dadosVoc[0].nome_gerente1,
      phone: data.dadosVoc[0].contato_ger1,
      alarme: alarme,
      });

      await vocalizacaoHistoryTemsRepository.save(newData);

      await resquetSincro(data, data.dadosVoc[0].nome_gerente1, newData.code.toString(), data.dadosVoc[0].contato_ger1)

      const monitorando = newData.code.toString();

      setTimeout(async() => {

        const oneReturnVocalizacao = await returnVocalizacaoTemsRepository.findOneBy({
            code: monitorando,
        });

        const historyVoc = await vocalizacaoHistoryTemsRepository.findOneBy({
          code: Number(monitorando)
        })

        if (oneReturnVocalizacao && historyVoc) { 

          vocalizacaoHistoryTemsRepository.update(historyVoc.id, {
            status: true,
          });            
          return

        } else {
              
          const newData = vocalizacaoHistoryTemsRepository.create({
            contact_id: data.dadosVoc[0].id_grupo_atuacao,
            plantonista: data.dadosVoc[0].nome_gerente2,
            phone: data.dadosVoc[0].contato_ger2,
            alarme: alarme,
          });

          await vocalizacaoHistoryTemsRepository.save(newData);

          await resquetSincro(data, data.dadosVoc[0].nome_gerente2, newData.code.toString(), data.dadosVoc[0].contato_ger2)

          const monitorando = newData.code.toString();

          setTimeout(async () => {

            const oneReturnVocalizacao = await returnVocalizacaoTemsRepository.findOneBy({
                code: monitorando,
              });

              const historyVoc = await vocalizacaoHistoryTemsRepository.findOneBy({
                code: Number(monitorando)
              })

            if (oneReturnVocalizacao && historyVoc) {
              
              vocalizacaoHistoryTemsRepository.update(historyVoc.id, {
                status: true,
              });
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

  const dtFormat = new Date(data.alarme.firstSeen)
  const isoFormat = dtFormat.toISOString()
  const dtFormatado = isoFormat.slice(0,10) + " " + isoFormat.slice(11,19)

  const classificacaoFt:any = {
    "5": "crítico",
    "4": "majoritário",
    "3": "minoritário",
    "CRITICO": "crítico",
    "MAJORITARIO": "majoritário",
    "MINORITARIO": "minoritário",
    "CRITICAL": "crítico",
    "MAJOR": "majoritário",
    "MINOR": "minoritário",
  }

  const output = {
    contacts: [
      {
        name: name,
        code: code,
        phones: [phone],            
        ALARME: !!data.alarme?.persistent_frontSpecificProblem? data.alarme?.persistent_frontSpecificProblem.replaceAll("_"," ").replaceAll(" ",". ").toLowerCase() : data.alarme?.persistent_specificProblem.replaceAll("_"," ").replaceAll(" ",". ").toLowerCase(),
        CLASSIFICACAO: !!data.alarme?.persistent_classificacao && !!classificacaoFt[data.alarme?.persistent_classificacao]? classificacaoFt[data.alarme?.persistent_classificacao] : 'crítico',
        TIPO_PLANTA: data.alarme?.persistent_frontTypeTa.toLowerCase() || data.alarme?.persistent_tipoTA.toLowerCase(),
        LOCALIDADE: data.alarme?.persistent_localidadeSigla,
        ESTADO: data.alarme?.persistent_estadoSigla,
        TA: !!data.alarme?.persistent_ta? data.alarme?.persistent_ta.toString() : 'SEMTA',            
        TIPO_REDE: data.alarme?.persistent_frontNetworkType.replaceAll("_"," ").replaceAll(" ",". ").toLowerCase() || data.alarme?.persistent_tipoRede.replaceAll("_"," ").replaceAll(" ",". ").toLowerCase(),
        DATA_HORA: dtFormatado,
      },
    ],
  };
  console.log(output);

  axios.post(String(process.env.URL_SINC_DL), output, {
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export default callTemsService