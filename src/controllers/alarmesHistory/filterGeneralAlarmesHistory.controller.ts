import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import filterGeneralHistoryAlarmes from "../../services/alarmesHistory/filterGeneralHistoryAlarmes.service";

const filterGeneralAlarmesHistoryController = async (req: Request, res: Response) => {
  const page = req.query.page || "1";
  const size = req.query.size || "20";
  
  try {
    const result = await filterGeneralHistoryAlarmes(req.body,Number(page),Number(size));

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
export default filterGeneralAlarmesHistoryController;
