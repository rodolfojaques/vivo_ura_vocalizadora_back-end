import { Router } from "express";
import listAlarmesHistoryController from "../controllers/alarmesHistory/listAlarmesHistory.controller";
import listVocalizaoHistoryController from "../controllers/vocalizacaoHistory/listVocalizacaoHistory.controller";
import createAlarmesHistoryController from "../controllers/alarmesHistory/createAlarmesHistory.controller";

const alarmesHistoryRouter = Router();

alarmesHistoryRouter.post("", listAlarmesHistoryController);
alarmesHistoryRouter.post("/create", createAlarmesHistoryController);
alarmesHistoryRouter.get("/vocalizacao-hist", listVocalizaoHistoryController);

export default alarmesHistoryRouter;
