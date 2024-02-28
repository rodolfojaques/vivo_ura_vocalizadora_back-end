import { Router } from "express";
import validateTokenMiddleware from "../middlewares/validateToken.middleware";
import createGrupoAlarmesTemsController from "../controllers/gruposAlarmesTems/createGrupoAlarmesTems.controller";
import listGruposAlarmesTemsController from "../controllers/gruposAlarmesTems/listGruposAlarmesTems.controller";
import listGruposAlarmesByIdTemsController from "../controllers/gruposAlarmesTems/listGrupoAlarmesByIdTems.controller";
import updateGrupoAlarmesTemsController from "../controllers/gruposAlarmesTems/updateGrupoAlarmesTems.controller";
import deleteGrupoAlarmesTemsController from "../controllers/gruposAlarmesTems/deleteGrupoAlarmesTems.controller";
import addGrupoAtuacaoTemsController from "../controllers/gruposAlarmesTems/addGrupoAtuacaoTems.controller";
import deleteGrupoAtuacaoTemsController from "../controllers/gruposAlarmesTems/deleteGrupoAtuacaoTems.controller";

const gruposAlarmesTemsRouter = Router()

gruposAlarmesTemsRouter.post("/register",validateTokenMiddleware,createGrupoAlarmesTemsController)
gruposAlarmesTemsRouter.get("",validateTokenMiddleware,listGruposAlarmesTemsController)
gruposAlarmesTemsRouter.get("/:id",validateTokenMiddleware,listGruposAlarmesByIdTemsController)
gruposAlarmesTemsRouter.patch("/update/:id",validateTokenMiddleware,updateGrupoAlarmesTemsController)
gruposAlarmesTemsRouter.delete("/delete/:id",validateTokenMiddleware,deleteGrupoAlarmesTemsController)
gruposAlarmesTemsRouter.post("/add-grupo-atuacao/:id",validateTokenMiddleware,addGrupoAtuacaoTemsController)
gruposAlarmesTemsRouter.patch("/delete-grupo-atuacao/:id",validateTokenMiddleware,deleteGrupoAtuacaoTemsController)

export default gruposAlarmesTemsRouter