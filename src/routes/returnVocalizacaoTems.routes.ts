import { Router } from "express";
import createReturnVocalizaoTemsController from "../controllers/returnVocalizacao/createReturnVocalizacaoTems.controller";

const returnVocalizacaoTemsRouter = Router();

returnVocalizacaoTemsRouter.post("", createReturnVocalizaoTemsController);

export default returnVocalizacaoTemsRouter;
