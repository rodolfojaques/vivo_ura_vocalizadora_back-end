import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import filterAlarmesHistoryService from "../../services/alarmesHistory/filterHistoryAlarmes.service";

const filterAlarmesHistoryController = async (req: Request, res: Response) => {
  const page = req.query.page || "1";
  const size = req.query.size || "20";
  
  const {...queryParams} = req.query
  try {
    const result = await filterAlarmesHistoryService(req.body,Number(page),Number(size));

    return res.json({
      object: 'list',
      has_more: result.currentPage < result.totalPages,
      data: result.items,
      pageCount: result.totalPages,
      itemCount: result.totalCount,
      currentPage: result.currentPage,
      total: result.total
    });

  } catch (error) {
    if (error instanceof AppError) handleError(error, res);
  }
};
export default filterAlarmesHistoryController;
