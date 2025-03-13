import { Router } from "express";
import { deleteAlarmsDlController, deleteAlarmsSgController } from "../controllers/clearMethods/clearMethods.controller";

const clearMethodsRouter = Router()

clearMethodsRouter.post("/sg",deleteAlarmsSgController)
clearMethodsRouter.post("/dl",deleteAlarmsDlController)

export default clearMethodsRouter