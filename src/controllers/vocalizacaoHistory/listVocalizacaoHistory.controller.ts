import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import listVocalizacaoHistoryService from "../../services/vocalizacaoHistory/list.vocalizacao.service";

const listVocalizaoHistoryController = async (req: Request, res: Response) => {
  try {
    const page = req.query.page || "1"
    const size = req.query.size || "20"

    const result = await listVocalizacaoHistoryService(Number(page),Number(size));

    return res.json({
      object: 'list',
      has_more: result.currentPage < result.totalPages,
      data: result.items,
      pageCount: result.totalPages,
      itemCount: result.totalCount,
      currentPage: result.currentPage,
      total: result.total
    })
  } catch (error) {
    if (error instanceof AppError) handleError(error, res);
  }
};
export default listVocalizaoHistoryController;
