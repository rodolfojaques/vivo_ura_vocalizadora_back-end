import { Router } from "express";
import createUsuarioController from "../controllers/usuarios/createUsuario.controller";
import listUsuarioByIdController from "../controllers/usuarios/listUsuarioById.controller";
import listAllUsuariosController from "../controllers/usuarios/listAllUsuarios.controller";
import deleteUsuarioController from "../controllers/usuarios/deleteUsuario.controller";
import updateUsuarioController from "../controllers/usuarios/updateUsuario.controller";
import validateTokenMiddleware from "../middlewares/validateToken.middleware";

const usuarioRoutes = Router()

usuarioRoutes.post("/register",validateTokenMiddleware,createUsuarioController)
usuarioRoutes.get("/:id",validateTokenMiddleware,listUsuarioByIdController)
usuarioRoutes.get("",validateTokenMiddleware,listAllUsuariosController)
usuarioRoutes.patch("/update/:id",validateTokenMiddleware,updateUsuarioController)
usuarioRoutes.delete("/delete/:id",validateTokenMiddleware,deleteUsuarioController)

export default usuarioRoutes