import { Router } from "express";
import awaitAndPersistenceController from "../controllers/tems-tools/awaitAndPersistence.controller";

const filterInputRouter = Router()

filterInputRouter.post("",awaitAndPersistenceController)

export default filterInputRouter