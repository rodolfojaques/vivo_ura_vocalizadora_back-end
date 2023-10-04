import { Express } from "express";
import usuarioRoutes from "./usuarios.routes";
import dataRouter from "./datas.routes";

export const appRoutes = (app: Express) => {
    app.use("/usuario", usuarioRoutes)
    app.use("/datas", dataRouter)
};