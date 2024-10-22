import { instanceToPlain } from "class-transformer";
import { VocalizacaoHistory } from "../../../src-new/entities/vocalizacao.history.entity";
import { AppDataSource, AppDataSourceHistory } from "../../data-source";
import matchGroupAlarmeSGService from "./matchGroupAlarm.service";
import { Usuarios } from "../../entities/usuarios.entity";

const vocalizacaoService = async (data: any) => {
    const vocalizacaoHistoryRepository = AppDataSourceHistory.getRepository(VocalizacaoHistory);
    
    const usuariosRepository = AppDataSource.getRepository(Usuarios)

    const grupoAlarmeResponsavel = await matchGroupAlarmeSGService(data)

    if(grupoAlarmeResponsavel.length > 0){

        if(grupoAlarmeResponsavel.length === 0){
            const newData = vocalizacaoHistoryRepository.create({
                contact_id: 0,
                plantonista: "Alarme sem plantonista responsavel",
                phone: "Alarme sem plantonista responsavel",
                alarme: data,
            });
          
            await vocalizacaoHistoryRepository.save(newData);

            console.log('Alarme sem plantonista disponível');

            return newData
        }


        if(grupoAlarmeResponsavel.length === 1){
            const userX = await usuariosRepository.findOneBy({ id: grupoAlarmeResponsavel[0].usuario_id })

            return {
                alarme: data,
                plantonista: instanceToPlain(userX), 
                grupoAtuacao: grupoAlarmeResponsavel[0]
            }         
        } else {
            const random = Math.floor(Math.random() * grupoAlarmeResponsavel.length)

            const userX = await usuariosRepository.findOneBy({ id: grupoAlarmeResponsavel[random].usuario_id })
            
            return {
                alarme: data,
                plantonista: instanceToPlain(userX), 
                grupoAtuacao: grupoAlarmeResponsavel[random]
            }            
        }        

    } else {
        
        const newData = vocalizacaoHistoryRepository.create({
            contact_id: 0,
            plantonista: "Alarme sem plantonista responsavel",
            phone: "Alarme sem plantonista responsavel",
            alarme: data,
        });
      
        await vocalizacaoHistoryRepository.save(newData);

        console.log('Alarme sem plantonista disponível');
        return newData
    }
}

export default vocalizacaoService;
