import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { UserScheme } from "../Services/Database/DatabaseServices";
import UserRoles from "../Model/Enums/UserRole";
import ResponseMessage from "../Model/Model/ResponseMessage";
import { generateToken } from "../Services/TokenService/TokenService";
import ErrorModel from "../Model/Model/ErrorModel";

interface IUser{
    username : string,
    password : string,
    email : string,
    role : number
}

export const registerController = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const result = validationResult(req)
        if(!result.isEmpty()){
            return res.json(result)
        }

        const userBody = req.body as IUser
    
        const emailIsExists = await UserScheme.findOne({email : userBody.email}).exec()
    
        if(emailIsExists != null || emailIsExists != undefined){
            res.json(new ResponseMessage("Email already exists" , 200))
            return
        }

        await UserScheme.create({
            username :  userBody.username,
            email : userBody.email,
            password: userBody.password,
            roles : UserRoles.USER,
            blogs : [],
            comments : []
        })

        res.status(201)
        .json(new ResponseMessage("" , 201))
    }catch(e){
        next(e)
    }
}


export const loginController = async(req : Request, res : Response, next : NextFunction) => {
    try{
        const result = validationResult(req)
        if(!result.isEmpty()){
            return res.json(result)
        }

        const userBody = req.body as IUser
        
        // findUser information
        const user = await UserScheme.findOne({email : userBody.email})
        
        if(user == null || user == undefined){
            res.status(400)
            .json(new ResponseMessage("Email or password wrong please try again", 400))
            return
        }

        if(user.password != userBody.password){
            res.json(new ResponseMessage("Email or password wrong please try again", 400))
            return
        }

        const accessToken = generateToken({"userId" : user.id, "refresh" : false}, "1h")
        const refreshToken = generateToken({"userId" : user.id , "refresh" : true}, "720h")

        res
        .status(200)
        .json({
            "accessToken" : accessToken,
            "refreshToken" : refreshToken
        })
    }catch(e){
        next(e)
    }
}

export const refreshToken = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const userId = res.locals.userId
        const refreshToken = res.locals.refreshToken as boolean
        if(!refreshToken){
            next(new ErrorModel("Just only refresh token", 401))
        }

        const user = await UserScheme.findById(userId).exec()
        
        res.json({
            "accessToken" : generateToken({"userId" : user?.id}, "1h")
        })
    }catch(e){
        next(e)
    }
}

export const userBlogs = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const userId = res.locals.userId
        const blogs = await UserScheme.findById(userId)
        .populate({path : "blogs" , select : "title shortDescription description image"})
        .exec()

        res.json({
            "blogs" : blogs
        })
    }catch(e){
        next(e)
    }
} 


export const userComments = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const userId = res.locals.userId
        const comments = await UserScheme.findById(userId)
        .populate("comments")
        .exec()

        res.json({
            "comments" : comments
        })
    }catch(e){
        next(e)
    }
} 
