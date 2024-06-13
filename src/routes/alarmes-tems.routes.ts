import { Router } from "express";
import createAlarmesHistoryTemsController from "../controllers/alarmesHistoryTems/createAlarmesHistoryTems.controller";
import listAlarmesHistoryTemsController from "../controllers/alarmesHistoryTems/listAlarmesHistoryTems.controller";
import filterAlarmesTemsHistoryController from "../controllers/alarmesHistoryTems/filterAlarmesTemsHistory.controller";

const alarmesTemsRouter = Router()

alarmesTemsRouter.post("",listAlarmesHistoryTemsController)
alarmesTemsRouter.post("/filter", filterAlarmesTemsHistoryController)
alarmesTemsRouter.post("/register",createAlarmesHistoryTemsController)

export default alarmesTemsRouter