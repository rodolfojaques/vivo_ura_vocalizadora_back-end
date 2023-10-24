import { Router } from "express";
import createGruposDeAtuacaoController from "../controllers/gruposAtuacao/createGruposDeAtuacao.controller";
import validateTokenMiddleware from "../middlewares/validateToken.middleware";
import listGruposAtuacaoController from "../controllers/gruposAtuacao/listGruposAtuacao.controller";
import listGrupoAtuacaoByIdController from "../controllers/gruposAtuacao/listGrupoAtuacaoById.controller";
import updateGrupoAtuacaoController from "../controllers/gruposAtuacao/updateGrupoAtuacao.controller";
import deleteGrupoAtuacaoByIdController from "../controllers/gruposAtuacao/deleteGrupoAtuacaoById.controller";
import addUsuarioController from "../controllers/gruposAtuacao/addUsuario.constroller";
import deleteUsuarioController from "../controllers/gruposAtuacao/deleteUsuario.controller";
import addGrupoAlarmeController from "../controllers/gruposAtuacao/addGrupoAlarme.controller";
import deleteGrupoAlarmeController from "../controllers/gruposAtuacao/deleteGrupoAlarme.constroler";

const grupoAtuacaoRouter = Router()

grupoAtuacaoRouter.post("/register",validateTokenMiddleware,createGruposDeAtuacaoController)
grupoAtuacaoRouter.get("",validateTokenMiddleware,listGruposAtuacaoController)
grupoAtuacaoRouter.get("/:id",validateTokenMiddleware,listGrupoAtuacaoByIdController)
grupoAtuacaoRouter.patch("/update/:id",validateTokenMiddleware,updateGrupoAtuacaoController)
grupoAtuacaoRouter.delete("/delete/:id",validateTokenMiddleware,deleteGrupoAtuacaoByIdController)
grupoAtuacaoRouter.post("/add-user/:id",validateTokenMiddleware,addUsuarioController)
grupoAtuacaoRouter.patch("/delete-user/:id",validateTokenMiddleware,deleteUsuarioController)
grupoAtuacaoRouter.post("/add-grupo-alarme/:id",validateTokenMiddleware,addGrupoAlarmeController)
grupoAtuacaoRouter.patch("/delete-grupo-alarme/:id",validateTokenMiddleware,deleteGrupoAlarmeController)

export default grupoAtuacaoRouter