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
// app.post("/teste-filter", async(req:Request, res:Response) =>{
//     const data = req.body
//     const teste = await inputFilterTemsService(data)
//     return res.json({value:teste})
// })

// DESCOMENTAR PARA TESTAR FILTRO (body = alarme TEMS conforme vem do kafka)
app.post("/teste-match-group", async(req:Request, res:Response) =>{
    const data = req.body
    const teste = await matchGroupAlarmeService(data)
    return res.json(teste)
})

// DESCOMENTAR PARA TESTAR FILTRO (body = alarme TEMS conforme vem do kafka)
app.post("/teste-voc-plantonista", async(req:Request, res:Response) =>{
    const data = req.body
    const teste = await vocalizacaoTemsService(data)
    return res.json(teste)
})

export default app