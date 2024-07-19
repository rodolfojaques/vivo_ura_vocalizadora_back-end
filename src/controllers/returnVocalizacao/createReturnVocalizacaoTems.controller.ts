import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import returnVocalizacaoTemsService from "../../services/tems-tools/returnVocalizacaoTems.service";

const createReturnVocalizaoTemsController = async (req: Request, res: Response) => {
  try {
    const result = await returnVocalizacaoTemsService(req.body);
    return res.json(result);
  } catch (error) {
    if (error instanceof AppError) handleError(error, res);
  }
};
export default createReturnVocalizaoTemsController;
