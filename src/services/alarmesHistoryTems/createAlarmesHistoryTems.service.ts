import { AppDataSourceTemsHistory } from "../../data-source";
import { AlarmesHistoryTems } from "../../../src-temsHist/entities/alarmesTems.entity";

const createAlarmesHistoryTemsService = async (data: any) => {
  const alarmesRepository = AppDataSourceTemsHistory.getRepository(AlarmesHistoryTems);


  const alarm = alarmesRepository.create(data)
  await alarmesRepository.save(alarm)

  return alarm
};

export default createAlarmesHistoryTemsService;