import { AppDataSource } from "../../data-source"
import { AppError } from "../../error/appError"

import csv from 'csv-parser';
import fs from 'fs';
import { unlink } from 'fs/promises'
import getOrCreateGrupoAlarmesTemsService from "../gruposAlarmesTems/getOrCreateGrupoAlarmesTems.service"
import { GruposAlarmesTems } from "../../entities/gruposAlarmesTems.entity";
import { TipoAlarmeTems } from "../../entities/tipoAlarmeTems.entity";

const cargaMassivaDl = async (req:any) => {
    try {
        if (!req.file) {
            throw new AppError(400, 'Nenhum arquivo enviado.')
        }

        const gpAlmRepo = AppDataSource.getRepository(GruposAlarmesTems)
        const tpAlmRepo = AppDataSource.getRepository(TipoAlarmeTems)

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
                        nameGrupos.push(el.NOME_GRUPO)

                        await getOrCreateGrupoAlarmesTemsService(el) 
                    }
                })

                setTimeout(async() => {
                    await results.forEach(async (el:any) => {
                        const grupo = await gpAlmRepo.findOneBy({nomeGrupo:el.NOME_GRUPO})

                        if(grupo){
                            const tp = tpAlmRepo.create({
                                estadoSigla: el.estadoSigla,
                                manager: el.manager,
                                specificProblem: el.specificProblem,
                                frontNetworkType: el.frontNetworkType,
                                frontTypeTa: el.frontTypeTa,
                                frontPlantType: el.frontPlantType,
                                frontTypeFailure: el.frontTypeFailure
                            })

                            await tpAlmRepo.save({...tp, grupoAlarme:grupo!})                            
                        }
                    })   
                }, 2000);

                try {
                    await unlink(filePath);
                    console.log(`Arquivo ${filePath} deletado.`);
                } catch (error) {
                    console.error(`Erro ao deletar o arquivo: ${error}`);
                }

                console.log(results);
                return({message:'Arquivo processado com sucesso.', results:results})
            })        
    } catch (error) {
        if(error instanceof AppError){
            throw new AppError(500, error.message)
        }        
    }
}

export default cargaMassivaDl