import { Router } from "express";
import listAlarmesHistoryController from "../controllers/alarmesHistory/listAlarmesHistory.controller";

const alarmesHistoryRouter = Router();

alarmesHistoryRouter.get("", listAlarmesHistoryController);

export default alarmesHistoryRouter;
