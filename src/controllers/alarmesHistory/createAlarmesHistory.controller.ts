import { Request, Response } from "express";
import listAlarmesHistoryService from "../../services/alarmesHistory/listHistoryAlarmes.service";
import { AppError, handleError } from "../../error/appError";
import { AppDataSourceHistory } from "../../data-source";
import { AlarmesHistory } from "../../../src-new/entities/alarmes.entity";

const createAlarmesHistoryController = async (req: Request, res: Response) => {
  try {
    const repository = AppDataSourceHistory.getRepository(AlarmesHistory);
    const newData = repository.create({ ...req.body });
    await repository.save(newData);

    return res.json(newData);
  } catch (error) {
    if (error instanceof AppError) handleError(error, res);
  }
};
export default createAlarmesHistoryController;
