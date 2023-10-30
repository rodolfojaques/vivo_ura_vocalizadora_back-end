import { EntityManager, getManager } from "typeorm";
import { AlarmesHistory } from "../../../src-new/entities/alarmes.entity";
import { AppDataSourceHistory } from "../../data-source";

const listAlarmesHistoryService = async (
  TIPO_TA: string,
  TIPO_REDE: string
) => {
  const alarmesRepository = AppDataSourceHistory.getRepository(AlarmesHistory);
  const query = `SELECT * FROM alarmes_history WHERE ($1::text IS NULL OR "TIPO_TA" = $1::text)
                                             AND ($2::text IS NULL OR "TIPO_REDE" = $2::text)`;

  const results = await alarmesRepository.query(query, [TIPO_TA, TIPO_REDE]);
  console.log(results);
  return results;
};

export default listAlarmesHistoryService;
