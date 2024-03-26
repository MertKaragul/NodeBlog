import ErrorModel from "../Model/Model/ErrorModel";
import { UserScheme } from "../Services/Database/DatabaseServices";
import { verifyToken } from "../Services/TokenService/TokenService";
import {Request, Response, NextFunction} from "express";


// A basic validator token middleware, if token expired return error middleware
export const validatorMiddleware = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const getToken = req.headers.authorization as string
        if(getToken == undefined || getToken == null || getToken.length == 0){
            next(new ErrorModel("Token required", 401))
        }
        const verifiedToken = verifyToken(getToken.replace("Bearer ", ""))

        const tokenJson = JSON.parse(JSON.stringify(verifiedToken))

        const userId = tokenJson["claim"]["userId"]
        if(userId == null || userId == undefined){
            next(new ErrorModel("User not found" , 401))
        }

        const findUser = await UserScheme.findById(userId)
        if(findUser == null || findUser == undefined){
            next(new ErrorModel("User not found" , 401))
        }

        const isRefreshToken = tokenJson["claim"]["refresh"] as boolean
        (isRefreshToken == true) ? res.locals.refreshToken = true : res.locals.refreshToken = false
        
        res.locals.userId = userId
        next()
    }catch(e){
        next(e)
    }
}