import { Router } from "express";
import createFilterInputController from "../controllers/tems-tools/createFilterInput.controller";

const filterInputRouter = Router()

filterInputRouter.post("",createFilterInputController)

export default filterInputRouter