import { AppDataSource, AppDataSourceHistory } from "../../data-source";
import { Alarmes } from "../../entities/alarmes.entity";
import { AlarmesHistory } from "../../../src-new/entities/alarmes.entity";
const createAlarmeService = async (data: any) => {
  const alarmesRepository = AppDataSource.getRepository(Alarmes);

  const alarmeHistory = AppDataSourceHistory.getRepository(AlarmesHistory);

  const alarme = alarmesRepository.create({ ...data });
  await alarmesRepository.save(alarme);
  const history = alarmeHistory.create({ ...data });
  await alarmeHistory.save(history);

  return alarme;
};

export default createAlarmeService;
