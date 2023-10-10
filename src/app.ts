import "reflect-metadata"
import "express-async-errors"
import express from "express"
import globalErrorMiddleware from "./middlewares/globalError.middleware"
import { appRoutes } from "./routes"
import cors from "cors"

const app = express()
app.use(cors())

app.use(express.json())

appRoutes(app)

app.use(globalErrorMiddleware)

export default app