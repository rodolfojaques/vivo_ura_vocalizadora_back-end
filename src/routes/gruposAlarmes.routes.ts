import { Router } from "express";
import createGrupoAlarmesController from "../controllers/gruposAlarmes/createGrupoAlarmes.controller";
import listGruposAlarmesController from "../controllers/gruposAlarmes/listGruposAlarmes.controller";
import validateTokenMiddleware from "../middlewares/validateToken.middleware";
import listGruposAlarmesByIdController from "../controllers/gruposAlarmes/listGrupoAlarmesById.controller";
import updateGrupoAlarmesController from "../controllers/gruposAlarmes/updateGrupoAlarmes.controller";
import deleteGrupoAlarmesController from "../controllers/gruposAlarmes/deleteGrupoAlarmes.controller";

const gruposAlarmesRouter = Router()

gruposAlarmesRouter.post("/register",validateTokenMiddleware,createGrupoAlarmesController)
gruposAlarmesRouter.get("",validateTokenMiddleware,listGruposAlarmesController)
gruposAlarmesRouter.get("/:id",validateTokenMiddleware,listGruposAlarmesByIdController)
gruposAlarmesRouter.patch("/update/:id",validateTokenMiddleware,updateGrupoAlarmesController)
gruposAlarmesRouter.delete("/delete/:id",validateTokenMiddleware,deleteGrupoAlarmesController)

export default gruposAlarmesRouter