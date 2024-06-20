import "reflect-metadata"
import "express-async-errors"
import express, { Request,Response } from "express"
import paginate from "express-paginate"
import globalErrorMiddleware from "./middlewares/globalError.middleware"
import { appRoutes } from "./routes"
import cors from "cors"
import cron from "node-cron"
import clearRoutine from "./utils/clearRoutine"
import inputFilterTemsService from "./services/tems-tools/inputFilterTems.service"
import matchGroupAlarmeService from "./services/tems-tools/matchGroupAlarm.service"
import vocalizacaoTemsService from "./services/tems-tools/vocalizacaoTems.service"
import arr from "../work"
import { AppDataSource } from "./data-source"
import { GeradorUniqueCodePocSmartoss } from "./entities/gerador-unique-code-poc-smartoss.entity"
import awaitAndPersistenceSevice from "./services/tems-tools/awaitAndPersistence.service"

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

// DESCOMENTAR PARA TESTAR FILTRO (body = alarme TEMS conforme vem do kafka)
app.post("/teste-filter", async(req:Request, res:Response) =>{
    const data = req.body
    const teste = await inputFilterTemsService(data)
    return res.json({value:teste})
})

// DESCOMENTAR PARA TESTAR FILTRO (body = alarme TEMS conforme vem do kafka)
// app.post("/teste-match-group", async(req:Request, res:Response) =>{
//     const data = req.body
//     const teste = await matchGroupAlarmeService(data)
//     return res.json(teste)
// })

// DESCOMENTAR PARA TESTAR FILTRO (body = alarme TEMS conforme vem do kafka)
app.post("/teste-voc-plantonista", async(req:Request, res:Response) =>{
    const data = req.body
    const teste = await awaitAndPersistenceSevice(data)
    return res.json(teste)
})

// POC SMARTOSS
// app.get("/work-exemple", (req:Request, res:Response) =>{
//     return res.json({response: arr})
// })
//     // TESTE LOGICA FILTRO ALARME
// app.post("/output-exemple",async (req:Request, res:Response) => { 
//     const data = req.body

//     const generateCodeRepo = AppDataSource.getRepository(GeradorUniqueCodePocSmartoss)
//     const newCode = generateCodeRepo.create({})
//     await generateCodeRepo.save(newCode)

//     const dtFormat = new Date(data.firstSeen)
//     const isoFormat = dtFormat.toISOString()
//     const dtFormatado = isoFormat.slice(0,10) + " " + isoFormat.slice(11,19)

//     /**
//       ROD: 
//       PRI: "19992543340" 
//       ALE: "21998837700"
//     */
//     /**
//       Samuel: "21988754180"
//       Gilda Bergamo: "21998040913" 
//       Flavio Magalhaes: "11973756919"
//     */
//     const output = {
//       contacts: [
//         {
//           name: 'SmartOss Plantonista',
//           code: newCode.id.toString(),
//           phones: ["51920000339"],                      
//           ALARME: data.persistent.frontSpecificProblem,
//           SITE: "0",
//           LOCALIDADE: data.persistent.localidadeSigla,
//           ESTADO: data.persistent.estadoSigla,
//           TA: !!data.persistent.ta? data.persistent.ta.toString() : 'SEMTA',                      
//           TIPO_REDE: "0",
//           DATA_HORA: dtFormatado,
//         },
//       ],
//     }; 
    
//     const conditionalCephAlarm1 = data.manager.includes('SMARTOSS_ATLAS') && data.persistent.id.includes('CEPH_OSD_LATENCY') && data.persistent.frontSpecificProblem.includes('FALHA LATENCIA_ALTA ELEMENTO')
//     const conditionalCephAlarm2 = data.manager.includes('SMARTOSS_ATLAS') && data.persistent.id.includes('CEPH_HEALTH_STATUS') && data.persistent.frontSpecificProblem.includes('FALHA INDISPONIBILIDADE SERVICO')
//     const conditionalCephAlarm3 = data.manager.includes('SMARTOSS_ATLAS') && data.persistent.id.includes('CEPH_DAEMONS_STATUS') && data.persistent.frontSpecificProblem.includes('FALHA INDISPONIBILIDADE SERVICO')
    
//     if(conditionalCephAlarm1 || conditionalCephAlarm2 || conditionalCephAlarm3){
//       axios.post("http://186.238.82.229/api/mailing/12/contacts?key=kKoD1X4n", output, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       .catch((err) => console.error(err))

//       return res.json({response: output})
//     } else {
//       return res.json({response: "Alarme não corresponde aos critérios"})
//     }
// })

export default app