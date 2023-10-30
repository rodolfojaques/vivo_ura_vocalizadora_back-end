import { EntityManager, getManager } from "typeorm";
import { AlarmesHistory } from "../../../src-new/entities/alarmes.entity";
import { AppDataSourceHistory } from "../../data-source";

const listAlarmesHistoryService = async (
  TIPO_TA: string,
  TIPO_REDE: string
) => {
  const alarmesRepository = AppDataSourceHistory.getRepository(AlarmesHistory);

  //   Sua consulta SQL com placeholders nomeados
  const query = `
    SELECT * FROM alarmes_history;
  `;

  const results = await alarmesRepository.query(query, [TIPO_TA, TIPO_REDE]);
  console.log(results);
  return results;
};

export default listAlarmesHistoryService;
