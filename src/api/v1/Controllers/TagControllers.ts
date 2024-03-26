import { Request, Response, NextFunction } from "express";
import { BlogScheme, TagScheme, UserScheme } from "../Services/Database/DatabaseServices";
import UserRoles from "../Model/Enums/UserRole";
import ErrorModel from "../Model/Model/ErrorModel";

interface ITag{
    tag : string
}

export const getTags = async(req : Request, res : Response, next : NextFunction) => {
    try{
        res.json({
            "tags" : await TagScheme.find({},"blogId tag")
        })
    }catch(e){
        next(e)
    }
}

export const createTag = async(req : Request, res : Response, next : NextFunction) => {
    try{
        const tagBody = req.body as ITag
        const userId = res.locals.userId
        const findUser = await UserScheme.findById(userId.toString())
        if(findUser?.role != UserRoles.ADMIN.toString()){
            next(new ErrorModel("Just only Admin is authorized" , 401))
        }

        await TagScheme.create({
            tag : tagBody.tag.toString()
        })

        res.status(201).json()
    }catch(e){
        next(e)
    }
}

export const deleteTag = async(req : Request, res : Response, next : NextFunction) => {
    try{
        const tagId = req.params["id"]
        const userId = res.locals.userId
        const findUser = await UserScheme.findById(userId.toString())
        if(findUser?.role != UserRoles.ADMIN.toString()){
            next(new ErrorModel("Just only Admin is authorized" , 401))
        }
        await TagScheme.findById(tagId.toString()).deleteOne()
        res.status(200).json()
    }catch(e){
        next(e)
    }
}


export const updateTag = async(req : Request, res : Response, next : NextFunction) => {
    try{
        const bodyTag = req.body as ITag
        const tagId = req.params["id"]
        const userId = res.locals.userId
        const findUser = await UserScheme.findById(userId.toString())
        if(findUser?.role != UserRoles.ADMIN.toString()){
            next(new ErrorModel("Just only Admin is authorized" , 401))
        }
        await TagScheme.findById(tagId).updateOne({
            tag : bodyTag.tag.toString()
        })
        res.status(200).json()
    }catch(e){
        next(e)
    }
}