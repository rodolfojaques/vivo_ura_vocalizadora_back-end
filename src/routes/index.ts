import { Express } from "express";
import usuarioRoutes from "./usuarios.routes";

export const appRoutes = (app: Express) => {
    app.use("/usuario", usuarioRoutes)
};