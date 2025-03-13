import "reflect-metadata"
import "express-async-errors"
import express, {Request,Response} from "express"
import globalErrorMiddleware from "./middlewares/globalError.middleware"
import { appRoutes } from "./routes"
import cors from "cors"
import cron from "node-cron"
import clearRoutine from "./utils/clearRoutine"
import "dotenv/config"
import axios from "axios"

const app = express()

const corsOptions = {
    origin: [
        String(process.env.URL_IP_URA),    
        String(process.env.URL_DNS_URA), 
        String(process.env.URL_MS_CERT_URA),           
        String(process.env.URL_IP_SG_INFRA),           
        String(process.env.URL_IP_SINC), 'http://localhost:3001'       
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*'
};
app.use(cors())
// app.use(cors(corsOptions))

app.use(express.json())

appRoutes(app)

app.use(globalErrorMiddleware)

cron.schedule('* 3 * * *', () => {
    console.log('Executando rotina de exclusão de dados do DB...')
    clearRoutine()
})

app.post('/exemple-test', async (req: Request, res: Response) => {

    const data = req.body

    const dtFormat = new Date(data.firstSeen)
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

    /*
    ROD: "51920000339"
    BUC: "11955553261"
    ANT: "11942830058"
    PRI: "19992543340"
    ALE: "21998837700"
    GON: "11931442228"
    SAM: "21988754180"
    */

    const output = {
      contacts: [
          {
              name: 'SmartOss Plantonista',
              code: "2",
              phones: ["51920000339"],                       
              ALARME: !!data.persistent.frontSpecificProblem? data.persistent.frontSpecificProblem.replaceAll("_"," ").replaceAll(" ",". ").toLowerCase() : data.persistent.specificProblem.replaceAll("_"," ").replaceAll(" ",". ").toLowerCase(),
              CLASSIFICACAO: !!data.persistent.classificacao && !!classificacaoFt[data.persistent.classificacao]? classificacaoFt[data.persistent.classificacao] : 'crítico',
              TIPO_PLANTA: data.persistent?.frontTypeTa.toLowerCase(),
              LOCALIDADE: data.persistent.localidadeSigla,
              ESTADO: data.persistent.estadoSigla,
              TA: !!data.persistent.ta? data.persistent.ta.toString() : 'SEMTA',              
              TIPO_REDE: data.persistent?.frontNetworkType?.replaceAll("_"," ").replaceAll(" ",". ").toLowerCase(),
              DATA_HORA: dtFormatado,
          },
      ],
  }

  if(!!data){
      axios.post("http://186.238.82.229/api/mailing/13/contacts?key=kKoD1X4n", output, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch((err) => console.error(err))


      return res.json({response: output})
  }
})

export default app