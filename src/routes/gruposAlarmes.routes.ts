import { Router } from "express";
import createGrupoAlarmesController from "../controllers/gruposAlarmes/createGrupoAlarmes.controller";

const gruposAlarmesRouter = Router()

gruposAlarmesRouter.post("/register",createGrupoAlarmesController)

export default gruposAlarmesRouter