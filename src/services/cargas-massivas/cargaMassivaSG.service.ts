import { AppDataSource } from "../../data-source"
import { GruposAlarmes } from "../../entities/gruposAlarmes.entity"
import { TipoAlarme } from "../../entities/tipoAlarme.entity"
import { AppError } from "../../error/appError"

import csv from 'csv-parser';
import fs from 'fs';
import { unlink } from 'fs/promises'
import getOrCreateGrupoAlarmesService from "../gruposAlarmes/getOrCreateGrupoAlarmes.service"

const cargaMassivaSg = async (req:any) => {
    try {
        if (!req.file) {
            throw new AppError(400, 'Nenhum arquivo enviado.')
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
                        nameGrupos.push(el.NOME_GRUPO)

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

                try {
                    await unlink(filePath);
                    console.log(`Arquivo ${filePath} deletado.`);
                } catch (error) {
                    console.error(`Erro ao deletar o arquivo: ${error}`);
                }
                
                return({message:'Arquivo processado com sucesso.', results:results})
            })        
    } catch (error) {
        if(error instanceof AppError){
            throw new AppError(500, error.message)
        }        
    }
}

export default cargaMassivaSg