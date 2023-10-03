import { Router } from "express";
import createUsuarioController from "../controllers/usuarios/createUsuario.controller";
import listUsuarioByIdController from "../controllers/usuarios/listUsuarioById.controller";
import listAllUsuariosController from "../controllers/usuarios/listAllUsuarios.controller";

const usuarioRoutes = Router()

usuarioRoutes.post("/register",createUsuarioController)
usuarioRoutes.get("/:id",listUsuarioByIdController)
usuarioRoutes.get("",listAllUsuariosController)

export default usuarioRoutes