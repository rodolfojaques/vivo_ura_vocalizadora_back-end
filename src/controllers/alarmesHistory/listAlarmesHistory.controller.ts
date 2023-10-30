import { Request, Response } from "express";
import listAlarmesHistoryService from "../../services/alarmesHistory/listHistoryAlarmes.service";
import { AppError, handleError } from "../../error/appError";
import { Pool, QueryConfig } from "pg";
import queryBuilderParamsService from "../../services/alarmesHistory/queryHistory.service";

const listAlarmesHistoryController = async (req: Request, res: Response) => {
  try {
    const { TIPO_TA, TIPO_REDE } = req.body;
    const alarmes = await listAlarmesHistoryService(TIPO_TA, TIPO_REDE);

    return res.json(alarmes);
  } catch (error) {
    if (error instanceof AppError) handleError(error, res);
  }
};
export default listAlarmesHistoryController;
