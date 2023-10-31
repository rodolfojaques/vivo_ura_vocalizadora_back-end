import { Request, Response } from "express";
import listAlarmesHistoryService from "../../services/alarmesHistory/listHistoryAlarmes.service";
import { AppError, handleError } from "../../error/appError";

const listAlarmesHistoryController = async (req: Request, res: Response) => {
  try {
    const alarmes = await listAlarmesHistoryService(req.body);

    return res.json(alarmes);
  } catch (error) {
    if (error instanceof AppError) handleError(error, res);
  }
};
export default listAlarmesHistoryController;
