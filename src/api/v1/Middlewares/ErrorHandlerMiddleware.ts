import {Request, Response, NextFunction} from  "express"
import ErrorModel from "../Model/Model/ErrorModel"


const errorHandlerMiddleware = (err : ErrorModel , req : Request, res : Response, next : NextFunction) => {
    res.status(err.statusCode || 500).json({
        statusCode : err.statusCode || 500,
        message : err.message,
    })
}

export default errorHandlerMiddleware