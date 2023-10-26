import { Router } from "express";
import createUsuarioController from "../controllers/usuarios/createUsuario.controller";
import listUsuarioByIdController from "../controllers/usuarios/listUsuarioById.controller";
import listAllUsuariosController from "../controllers/usuarios/listAllUsuarios.controller";
import deleteUsuarioController from "../controllers/usuarios/deleteUsuario.controller";
import updateUsuarioController from "../controllers/usuarios/updateUsuario.controller";
import validateTokenMiddleware from "../middlewares/validateToken.middleware";
import validateTypeUserMiddleware from "../middlewares/validateTypeUser.middleware";

const usuarioRoutes = Router()

usuarioRoutes.post("/register",validateTokenMiddleware,validateTypeUserMiddleware,createUsuarioController)
usuarioRoutes.get("/:id",validateTokenMiddleware,listUsuarioByIdController)
usuarioRoutes.get("",validateTokenMiddleware,listAllUsuariosController)
usuarioRoutes.patch("/update/:id",validateTokenMiddleware,validateTypeUserMiddleware,updateUsuarioController)
usuarioRoutes.delete("/delete/:id",validateTokenMiddleware,validateTypeUserMiddleware,deleteUsuarioController)

export default usuarioRoutes