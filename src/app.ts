import "reflect-metadata"
import "express-async-errors"
import express from "express"
import globalErrorMiddleware from "./middlewares/globalError.middleware"
import { appRoutes } from "./routes"

const app = express()

app.use(express.json())

appRoutes(app)

app.use(globalErrorMiddleware)

export default app