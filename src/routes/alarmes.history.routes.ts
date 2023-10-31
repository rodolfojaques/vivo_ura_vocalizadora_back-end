import { Router } from "express";
import listAlarmesHistoryController from "../controllers/alarmesHistory/listAlarmesHistory.controller";

const alarmesHistoryRouter = Router();

alarmesHistoryRouter.post("", listAlarmesHistoryController);

export default alarmesHistoryRouter;
