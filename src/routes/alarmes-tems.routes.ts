import { Router } from "express";
import createAlarmesHistoryTemsController from "../controllers/alarmesHistoryTems/createAlarmesHistoryTems.controller";
import listAlarmesHistoryTemsController from "../controllers/alarmesHistoryTems/listAlarmesHistoryTems.controller";

const alarmesTemsRouter = Router()

alarmesTemsRouter.post("/register",createAlarmesHistoryTemsController)
alarmesTemsRouter.post("",listAlarmesHistoryTemsController)

export default alarmesTemsRouter