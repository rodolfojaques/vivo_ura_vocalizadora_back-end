import { Express } from "express";
import usuarioRoutes from "./usuarios.routes";
import dataRouter from "./datas.routes";
import loginRouter from "./login.routes";

export const appRoutes = (app: Express) => {
    app.use("/usuario", usuarioRoutes)
    app.use("/datas", dataRouter)
    app.use("/login", loginRouter)
};