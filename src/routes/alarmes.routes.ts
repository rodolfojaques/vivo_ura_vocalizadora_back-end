import { Router } from "express";
import createAlarmeController from "../controllers/alarmes/createAlarme.controller";
import listAlarmesController from "../controllers/alarmes/listAlarmes.controller";

const alarmesRouter = Router()

alarmesRouter.post("/register",createAlarmeController)
alarmesRouter.get("",listAlarmesController)

export default alarmesRouter