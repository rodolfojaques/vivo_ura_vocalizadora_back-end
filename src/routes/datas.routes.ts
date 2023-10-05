import { Router } from "express";
import createDataController from "../controllers/datas/createData.controller";
import validateTokenMiddleware from "../middlewares/validateToken.middleware";

const dataRouter = Router()

dataRouter.post("/register",validateTokenMiddleware,createDataController)

export default dataRouter