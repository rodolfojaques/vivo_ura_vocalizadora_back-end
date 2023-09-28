import "reflect-metadata"
import "express-async-errors"
import express from "express"
import globalErrorMiddleware from "./middlewares/globalError.middleware"

const app = express()
app.use(express.json())

app.use(globalErrorMiddleware)

export default app