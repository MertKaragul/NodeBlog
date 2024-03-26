import dotenv from "dotenv"
dotenv.config()
import express from "express"
import blogsRouter from "./api/v1/Routes/BlogRouters"
import usersRouter from "./api/v1/Routes/UserRouters"
import commentRouter from "./api/v1/Routes/CommentRouters"
import tagRouter from "./api/v1/Routes/TagRouters"
import _ from "./api/v1/Services/Database/DatabaseServices"
import errorHandlerMiddleware from "./api/v1/Middlewares/ErrorHandlerMiddleware"
import bodyParser from "body-parser"
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

// Blog router
app.use(`${process.env.DEFAULT_API_PATH}/blogs`,blogsRouter)
app.use(`${process.env.DEFAULT_API_PATH}/users`,usersRouter)
app.use(`${process.env.DEFAULT_API_PATH}/comments`,commentRouter)
app.use(`${process.env.DEFAULT_API_PATH}/tags`,tagRouter)

app.use(errorHandlerMiddleware)

app.listen(3000)

export default app