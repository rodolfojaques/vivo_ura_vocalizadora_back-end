import { AppDataSource } from "../data-source";
import { Alarmes } from "../entities/alarmes.entity";
import { ReturnVocalizacao } from "../entities/returnVocalizacao.entity";

const clearRoutine = async () => {
    const alarmesRepository = AppDataSource.getRepository(Alarmes)
    const returnVocalizacaoRepository = AppDataSource.getRepository(ReturnVocalizacao)

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
}

export default clearRoutine