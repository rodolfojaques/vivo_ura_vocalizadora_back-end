import { Router } from "express";
import createFilterInputController from "../controllers/tems-tools/createFilterInput.controller";
import listFilterInputConstroller from "../controllers/tems-tools/listFilterInput.controller";
import deleteFilterInputController from "../controllers/tems-tools/deleteFilterInput.controller";
import validateTokenMiddleware from "../middlewares/validateToken.middleware";

const filterInputRouter = Router()

filterInputRouter.get("",validateTokenMiddleware,listFilterInputConstroller)
filterInputRouter.post("",validateTokenMiddleware,createFilterInputController)
filterInputRouter.delete("/:id",validateTokenMiddleware,deleteFilterInputController)

export default filterInputRouter