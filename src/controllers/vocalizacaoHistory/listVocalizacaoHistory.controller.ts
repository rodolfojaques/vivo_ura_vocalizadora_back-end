import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import listVocalizacaoHistoryService from "../../services/vocalizacaoHistory/list.vocalizacao.service";

const listVocalizaoHistoryController = async (req: Request, res: Response) => {
  try {
    const results = await listVocalizacaoHistoryService();
    return res.json(results);
  } catch (error) {
    if (error instanceof AppError) handleError(error, res);
  }
};
export default listVocalizaoHistoryController;
