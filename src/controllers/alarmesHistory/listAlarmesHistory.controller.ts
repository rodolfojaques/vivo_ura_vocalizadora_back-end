import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import listAlarmesHistoryService from "../../services/alarmesHistory/listHistoryAlarmes.service";

const listAlarmesHistoryController = async (req: Request, res: Response) => {
  try {
    const alarmes = await listAlarmesHistoryService();

    return res.json(alarmes);
  } catch (error) {
    if (error instanceof AppError) handleError(error, res);
  }
};

export default listAlarmesHistoryController;
