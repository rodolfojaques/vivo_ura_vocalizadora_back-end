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


import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';
import { GruposAlarmes } from "./entities/gruposAlarmes.entity"
import { TipoAlarme } from "./entities/tipoAlarme.entity"
import getOrCreateGrupoAlarmesService from "./services/gruposAlarmes/getOrCreateGrupoAlarmes.service"

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

/**
 * 
 * COMEÇAR PELA PARTE DE EXCLUSÃO DE  ARQUIVOS SUBMETIDOS
 */

const upload = multer({ dest: 'uploads/'})

app.post('/carga-massiva-sg', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('Nenhum arquivo enviado.')
        }

        const gpAlmRepo = AppDataSource.getRepository(GruposAlarmes)
        const tpAlmRepo = AppDataSource.getRepository(TipoAlarme)

        const grupos = await gpAlmRepo.find()
        const nameGrupos = grupos.map((el) => el.nomeGrupo)

        const filePath = req.file.path

        const results:any = []
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                await results.forEach(async (el:any) => {
                    if(!nameGrupos.includes(el.NOME_GRUPO)){
                        
                        console.log("antes:",nameGrupos);
                        nameGrupos.push(el.NOME_GRUPO)                        
                        console.log("depois:",nameGrupos);

                        await getOrCreateGrupoAlarmesService(el) 
                    }
                })

                setTimeout(async() => {
                    await results.forEach(async (el:any) => {
                        const grupo = await gpAlmRepo.findOneBy({nomeGrupo:el.NOME_GRUPO})

                        if(grupo){
                            const tp = tpAlmRepo.create({
                                uf:el.UF,
                                site:el.SITE,
                                tipoAlarme:el.TIPO_ALARME,
                                classificacao:el.CLASSIFICACAO,
                                localidade:el.LOCALIDADE
                            })

                            await tpAlmRepo.save({...tp, grupoAlarme:grupo!})                            
                        }
                    })   
                }, 2000);

                console.log(results);
                res.json({message:'Arquivo processado com sucesso.', results:results})
            })        
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }        
    }
})

export default app