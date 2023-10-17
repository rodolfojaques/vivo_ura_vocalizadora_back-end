import { Router } from "express";
import createDataController from "../controllers/datas/createData.controller";
import validateTokenMiddleware from "../middlewares/validateToken.middleware";
import listDataByUsuarioIdController from "../controllers/datas/listDatasByUserId.controller";
import deleteDatasByUsuarioIdController from "../controllers/datas/deleteDatasByUsuarioId.constroller";
import deleteDataByIdController from "../controllers/datas/deleteDataById.controller";

const dataRouter = Router()

dataRouter.post("/register/:id",validateTokenMiddleware,createDataController)
dataRouter.get("/plantoes/:id",validateTokenMiddleware,listDataByUsuarioIdController)
dataRouter.delete("/plantoes/delete/:id",validateTokenMiddleware,deleteDatasByUsuarioIdController)
dataRouter.delete("/delete/:id",validateTokenMiddleware,deleteDataByIdController)

export default dataRouter