import { Router } from "express";
import listAlarmesHistoryController from "../controllers/alarmesHistory/listAlarmesHistory.controller";
import listVocalizaoHistoryController from "../controllers/vocalizacaoHistory/listVocalizacaoHistory.controller";
import createAlarmesHistoryController from "../controllers/alarmesHistory/createAlarmesHistory.controller";
import filterAlarmesHistoryController from "../controllers/alarmesHistory/filterAlarmesHistory.controller";
import filterGeneralAlarmesHistoryController from "../controllers/alarmesHistory/filterGeneralAlarmesHistory.controller";

const alarmesHistoryRouter = Router();

alarmesHistoryRouter.post("", listAlarmesHistoryController);
alarmesHistoryRouter.post("/filter-general", filterGeneralAlarmesHistoryController);
alarmesHistoryRouter.post("/filter", filterAlarmesHistoryController);
alarmesHistoryRouter.post("/create", createAlarmesHistoryController);
alarmesHistoryRouter.get("/vocalizacao-hist", listVocalizaoHistoryController);

export default alarmesHistoryRouter;
