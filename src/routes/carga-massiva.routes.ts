import { Router } from "express";
import multer from "multer";
import cargaMassivaDLController from "../controllers/cargas-massivas/cargaMassivaDL.controller";
import cargaMassivaSGController from "../controllers/cargas-massivas/cargaMassivaSG.controller";

const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 10 * 1024 * 1024 }
  })

const cargaMassivaRouter = Router()

cargaMassivaRouter.post("/sg", upload.single('file'), cargaMassivaSGController)
cargaMassivaRouter.post("/dl", upload.single('file'), cargaMassivaDLController)

export default cargaMassivaRouter