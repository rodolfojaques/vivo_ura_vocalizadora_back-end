import { Router } from "express";
import validateTokenMiddleware from "../middlewares/validateToken.middleware";
import createTipoAlarmeTemsController from "../controllers/tiposAlarmesTems/createTipoAlarmeTems.constroller";
import deleteTipoAlarmeByIdTemsController from "../controllers/tiposAlarmesTems/deleteTipoAlarmeByIdTems.controller";
import listTiposAlarmesByIdGroupTemsController from "../controllers/tiposAlarmesTems/listTiposAlarmesByIdGroupTems.controller";

const tiposAlarmesTemsRouter = Router()

tiposAlarmesTemsRouter.post("/register/:idGrupo", validateTokenMiddleware, createTipoAlarmeTemsController)
tiposAlarmesTemsRouter.get("/:idGrupo", validateTokenMiddleware, listTiposAlarmesByIdGroupTemsController)
tiposAlarmesTemsRouter.delete("/delete/:id", validateTokenMiddleware, deleteTipoAlarmeByIdTemsController)

export default tiposAlarmesTemsRouter