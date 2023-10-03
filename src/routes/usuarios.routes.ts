import { Router } from "express";
import createUsuarioController from "../controllers/usuarios/createUsuario.controller";
import listUsuarioByIdController from "../controllers/usuarios/listUsuarioById.controller";
import listAllUsuariosController from "../controllers/usuarios/listAllUsuarios.controller";
import deleteUsuarioController from "../controllers/usuarios/deleteUsuario.controller";
import updateUsuarioController from "../controllers/usuarios/updateUsuario.controller";

const usuarioRoutes = Router()

usuarioRoutes.post("/register",createUsuarioController)
usuarioRoutes.get("/:id",listUsuarioByIdController)
usuarioRoutes.get("",listAllUsuariosController)
usuarioRoutes.patch("/update/:id",updateUsuarioController)
usuarioRoutes.delete("/delete/:id",deleteUsuarioController)

export default usuarioRoutes