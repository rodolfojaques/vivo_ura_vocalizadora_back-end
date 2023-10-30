import { AlarmesHistory } from "../../../src-new/entities/alarmes.entity";
import { AppDataSourceHistory } from "../../data-source";

const listAlarmesHistoryService = async () => {
  const alarmesRepository = AppDataSourceHistory.getRepository(AlarmesHistory);
  const alarmes = await alarmesRepository.find();

  return alarmes;
};

export default listAlarmesHistoryService;
