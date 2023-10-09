import { Router } from "express";
import createGruposDeAtuacaoController from "../controllers/gruposAtuacao/createGruposDeAtuacao.controller";
import validateTokenMiddleware from "../middlewares/validateToken.middleware";
import listGruposAtuacaoController from "../controllers/gruposAtuacao/listGruposAtuacao.controller";
import listGrupoAtuacaoByIdController from "../controllers/gruposAtuacao/listGrupoAtuacaoById.controller";
import updateGrupoAtuacaoController from "../controllers/gruposAtuacao/updateGrupoAtuacao.controller";

const grupoAtuacaoRouter = Router()

grupoAtuacaoRouter.post("/register",validateTokenMiddleware,createGruposDeAtuacaoController)
grupoAtuacaoRouter.get("",validateTokenMiddleware,listGruposAtuacaoController)
grupoAtuacaoRouter.get("/:id",validateTokenMiddleware,listGrupoAtuacaoByIdController)
grupoAtuacaoRouter.patch("/update/:id",validateTokenMiddleware,updateGrupoAtuacaoController)

export default grupoAtuacaoRouter