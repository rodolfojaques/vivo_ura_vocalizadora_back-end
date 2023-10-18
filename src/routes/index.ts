import { Express } from "express";
import usuarioRoutes from "./usuarios.routes";
import dataRouter from "./datas.routes";
import loginRouter from "./login.routes";
import grupoAtuacaoRouter from "./gruposAtuacao.routes";
import alarmesRouter from "./alarmes.routes";
import gruposAlarmesRouter from "./gruposAlarmes.routes";

export const appRoutes = (app: Express) => {
    app.use("/usuario", usuarioRoutes)
    app.use("/datas", dataRouter)
    app.use("/login", loginRouter)
    app.use("/grupos-atuacao", grupoAtuacaoRouter)
    app.use("/grupos-alarmes", gruposAlarmesRouter)
    app.use("/alarmes", alarmesRouter)
};