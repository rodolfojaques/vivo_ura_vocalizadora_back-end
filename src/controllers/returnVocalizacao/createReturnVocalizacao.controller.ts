import { Request, Response } from "express";
import { AppError, handleError } from "../../error/appError";
import returnVocalizacaoService from "../../services/vocalizacao/returnVocalizacao.service";

const createReturnVocalizaoController = async (req: Request, res: Response) => {
  try {
    const result = await returnVocalizacaoService(req.body);
    return res.json(result);
  } catch (error) {
    if (error instanceof AppError) handleError(error, res);
  }
};
export default createReturnVocalizaoController;
