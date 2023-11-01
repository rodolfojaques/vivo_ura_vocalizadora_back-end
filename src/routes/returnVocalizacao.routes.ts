import { Router } from "express";
import createReturnVocalizaoController from "../controllers/returnVocalizacao/createReturnVocalizacao.controller";

const returnVocalizacaoRouter = Router();

returnVocalizacaoRouter.post("", createReturnVocalizaoController);

export default returnVocalizacaoRouter;
