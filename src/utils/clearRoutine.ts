import { Alarmes } from "../entities/alarmes.entity";
import { AlarmesHistory } from "../../src-new/entities/alarmes.entity";
import { AppDataSource, AppDataSourceHistory, AppDataSourceTemsHistory } from "../data-source";
import { ReturnVocalizacao } from "../entities/returnVocalizacao.entity";
import { AlarmesHistoryTems } from "../../src-temsHist/entities/alarmesTems.entity";
import { ReturnVocalizacaoTems } from "../entities/returnVocalizacaoTems.entity";

const clearRoutine = async () => {
    const alarmesRepository = AppDataSource.getRepository(Alarmes)
    const alarmesHistoryRepository = AppDataSourceHistory.getRepository(AlarmesHistory)
    const returnVocalizacaoRepository = AppDataSource.getRepository(ReturnVocalizacao)

    const alarmesTemsRepository = AppDataSourceTemsHistory.getRepository(AlarmesHistoryTems)
    const returnVocalizacaoTemsRepository = AppDataSource.getRepository(ReturnVocalizacaoTems)

    async function deleteAlarmsBeforeTwoDays() {
      
        const result = await alarmesRepository
          .createQueryBuilder()
          .delete()
          .from(Alarmes)
          .where('DATA_APRESENTACAO < current_date - interval \'1 days\'')
          .orWhere('DATA_APRESENTACAO is null')
          .execute();
      
        return result;
    }
    
    deleteAlarmsBeforeTwoDays().then(result => {
    console.log(result);
    }).catch(error => {
    console.error(error);
    });

    
    async function deleteAlarmsHistoryBeforeOneMonth() {
      
        const result = await alarmesHistoryRepository
            .createQueryBuilder()
            .delete()
            .from(AlarmesHistory)
            .where('DATA_APRESENTACAO < current_date - interval \'1 month\'')
            .orWhere('DATA_APRESENTACAO is null')
            .execute();
      
        return result;
    }
    
    deleteAlarmsHistoryBeforeOneMonth().then(result => {
    console.log(result);
    }).catch(error => {
    console.error(error);
    });

    async function deleteReturnsBeforeTwoHours() {
    
    const result = await returnVocalizacaoRepository
        .createQueryBuilder()
        .delete()
        .from(ReturnVocalizacao)
        .where('createAt < current_timestamp - interval \'2 hours\'')
        .execute();
    
    return result;
    }
    
    deleteReturnsBeforeTwoHours().then(result => {
    console.log(result);
    }).catch(error => {
    console.error(error);
    });

    async function deleteAlarmsTemsBeforeOneWeek() {
      
        const result = await alarmesTemsRepository
            .createQueryBuilder()
            .delete()
            .from(AlarmesHistoryTems)
            .where('alarmInURA < current_date - interval \'1 week\'')
            .orWhere('alarmInURA is null')
            .execute();
      
        return result;
    }
    
    deleteAlarmsTemsBeforeOneWeek().then(result => {
    console.log(result);
    }).catch(error => {
    console.error(error);
    });

    async function deleteReturnsTemsBeforeTwoHours() {
    
    const result = await returnVocalizacaoTemsRepository
        .createQueryBuilder()
        .delete()
        .from(ReturnVocalizacaoTems)
        .where('createAt < current_timestamp - interval \'2 hours\'')
        .execute();
    
    return result;
    }
    
    deleteReturnsTemsBeforeTwoHours().then(result => {
    console.log(result);
    }).catch(error => {
    console.error(error);
    });
}

export default clearRoutine