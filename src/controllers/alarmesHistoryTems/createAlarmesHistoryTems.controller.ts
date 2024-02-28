import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import createAlarmesHistoryTemsService from "../../services/alarmesHistoryTems/createAlarmesHistoryTems.service";

const createAlarmesHistoryTemsController = async (req: Request, res: Response) => {
  try {
    const data = req.body

    const alarme = await createAlarmesHistoryTemsService(data)

    return res.json(alarme);

    } catch (error) {
      if (error instanceof AppError) handleError(error, res);
    }
    };
    export default createAlarmesHistoryTemsController;
