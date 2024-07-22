import "reflect-metadata"
import "express-async-errors"
import express, { Request,Response } from "express"
import paginate from "express-paginate"
import globalErrorMiddleware from "./middlewares/globalError.middleware"
import { appRoutes } from "./routes"
import cors from "cors"
import cron from "node-cron"
import clearRoutine from "./utils/clearRoutine"
import axios from "axios"

const app = express()
app.use(cors())

app.use(express.json())
app.use(paginate.middleware(10,50))

appRoutes(app)

app.use(globalErrorMiddleware)

cron.schedule('* 3 * * *', () => {
    console.log('Executando rotina de exclusão de dados do DB...')
    clearRoutine()
})




    // TESTE LOGICA FILTRO ALARME
app.post("/exemple-test",async (req:Request, res:Response) => { 
    const data = req.body
    console.log(data);
    console.log(data.persistent.ta);
    

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

    // const generateCodeRepo = AppDataSource.getRepository(GeradorUniqueCodePocSmartoss)
    // const newCode = generateCodeRepo.create({})
    // await generateCodeRepo.save(newCode)

    const dtFormat = new Date(data.firstSeen)
    const isoFormat = dtFormat.toISOString()
    const dtFormatado = isoFormat.slice(0,10) + " " + isoFormat.slice(11,19)

    /**
      ROD: "51920000339"
      ANG: "11994737299" 
      BUC: "11955553261"
      ANT: "11942830058"
    */
    const output = {
      contacts: [
        {
            name: 'SmartOss Plantonista',
            code: "1",
            phones: ["51920000339"],                      
            ALARME: !!data.persistent.frontSpecificProblem? data.persistent.frontSpecificProblem.replaceAll("_"," ").toLowerCase() : data.persistent.specificProblem.replaceAll("_"," ").toLowerCase(),
            CLASSIFICACAO: data.persistent.classificacao !== null && classificacaoFt[data.persistent.classificacao] !== null? classificacaoFt[data.persistent.classificacao] : 'crítico',
            TIPO_PLANTA: data.persistent.frontPlantType,
            LOCALIDADE: data.persistent.localidadeSigla,
            ESTADO: data.persistent.estadoSigla,
            TA: !!data.persistent.ta? data.persistent.ta.toString() : 'SEMTA',                    
            TIPO_REDE: data.persistent.frontNetworkType.replaceAll("_"," ").toLowerCase(),
            DATA_HORA: dtFormatado,
        },
      ],
    }; 
    
    // const conditionalCephAlarm1 = data.manager.includes('SMARTOSS_ATLAS') && data.persistent.id.includes('CEPH_OSD_LATENCY') && data.persistent.frontSpecificProblem.includes('FALHA LATENCIA_ALTA ELEMENTO')
    // const conditionalCephAlarm2 = data.manager.includes('SMARTOSS_ATLAS') && data.persistent.id.includes('CEPH_HEALTH_STATUS') && data.persistent.frontSpecificProblem.includes('FALHA INDISPONIBILIDADE SERVICO')
    // const conditionalCephAlarm3 = data.manager.includes('SMARTOSS_ATLAS') && data.persistent.id.includes('CEPH_DAEMONS_STATUS') && data.persistent.frontSpecificProblem.includes('FALHA INDISPONIBILIDADE SERVICO')
    
    // if(conditionalCephAlarm1 || conditionalCephAlarm2 || conditionalCephAlarm3){
    if(!!data){
      axios.post("http://186.238.82.229/api/mailing/13/contacts?key=kKoD1X4n", output, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch((err) => console.error(err))
    

      return res.json({response: output})
    } else {
      return res.json({response: "Alarme não corresponde aos critérios"})
    }
})

export default app