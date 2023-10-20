import { Router } from "express";
import createTipoAlarmeController from "../controllers/tiposAlarmes/createTipoAlarme.constroller";
import validateTokenMiddleware from "../middlewares/validateToken.middleware";
import listTiposAlarmesByIdGroupController from "../controllers/tiposAlarmes/listTiposAlarmesByIdGroup.controller";
import deleteTipoAlarmeByIdController from "../controllers/tiposAlarmes/deleteTipoAlarmeById.controller";

const tiposAlarmesRouter = Router()

tiposAlarmesRouter.post("/register/:idGrupo", validateTokenMiddleware, createTipoAlarmeController)
tiposAlarmesRouter.get("/:idGrupo", validateTokenMiddleware, listTiposAlarmesByIdGroupController)
tiposAlarmesRouter.delete("/delete/:id", validateTokenMiddleware, deleteTipoAlarmeByIdController)

export default tiposAlarmesRouter