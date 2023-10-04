import { Router } from "express";
import createDataController from "../controllers/datas/createData.controller";

const dataRouter = Router()

dataRouter.post("/register/:id",createDataController)

export default dataRouter