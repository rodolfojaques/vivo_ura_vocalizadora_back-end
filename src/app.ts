import "reflect-metadata"
import "express-async-errors"
import express from "express"
import paginate from "express-paginate"
import globalErrorMiddleware from "./middlewares/globalError.middleware"
import { appRoutes } from "./routes"
import cors from "cors"
import cron from "node-cron"
import clearRoutine from "./utils/clearRoutine"
import "dotenv/config"
import awaitAndPersistenceSevice from "./services/tems-tools/awaitAndPersistence.service"

const app = express()

const corsOptions = {
    origin: [
        String(process.env.URL_IP_URA),    
        String(process.env.URL_DNS_URA),           
        String(process.env.URL_IP_SG_INFRA),           
        String(process.env.URL_IP_SINC), 'http://localhost:3001'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With']
};
// app.use(cors())
app.use(cors(corsOptions))

app.use(express.json())
app.use(paginate.middleware(10,50))

appRoutes(app)

app.use(globalErrorMiddleware)

cron.schedule('* 3 * * *', () => {
    console.log('Executando rotina de exclusão de dados do DB...')
    clearRoutine()
})

app.post('/teste', async (req, res) => {
    const data = req.body
    const service = await awaitAndPersistenceSevice(data)
    res.json(service)
})

export default app