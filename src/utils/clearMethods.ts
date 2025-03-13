import { AlarmesHistory } from "../../src-new/entities/alarmes.entity";
import { AppDataSourceHistory, AppDataSourceTemsHistory } from "../data-source";
import { AlarmesHistoryTems } from "../../src-temsHist/entities/alarmesTems.entity";

const alarmesHistoryRepository = AppDataSourceHistory.getRepository(AlarmesHistory)
const alarmesTemsRepository = AppDataSourceTemsHistory.getRepository(AlarmesHistoryTems)


export async function deleteAlarmsSg(days: number) {
    days = days || 30;
    if (days < 1) {
        days = 1;
    }
    const days_str = (days - 1).toString();
    
    const result = await alarmesHistoryRepository
        .createQueryBuilder()
        .delete()
        .from(AlarmesHistory)
        .where(`DATA_APRESENTACAO < current_date - interval \'${days_str} days\'`)
        .orWhere('DATA_APRESENTACAO is null')
        .execute();
    
    return result;
}

export async function deleteAlarmsDl(days: number) {
    days = days || 30;
    if (days < 1) {
        days = 1;
    }
    const days_str = (days - 1).toString();

    const result = await alarmesTemsRepository
        .createQueryBuilder()
        .delete()
        .from(AlarmesHistoryTems)
        .where(`alarmInURA < current_date - interval \'${days_str} days\'`)
        .orWhere('alarmInURA is null')
        .execute();
    
    return result;
}
