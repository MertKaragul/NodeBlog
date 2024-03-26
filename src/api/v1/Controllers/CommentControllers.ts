import {Request, Response, NextFunction} from "express"
import { BlogScheme, CommentScheme, UserScheme } from "../Services/Database/DatabaseServices"



interface IComment{
    comment : string
}

export const createComment = async (req : Request , res : Response, next : NextFunction) => {
    try{
        const comment = req.body as IComment
        const blogId = req.params["id"] as string
        const user = await UserScheme.findById(res.locals.userId) 

        const commentCreated = await CommentScheme.create({
            comment : comment.comment,
            blogModel : await BlogScheme.findById(blogId),
            userModel : user
        })

        await BlogScheme.updateOne({
            commentModel : commentCreated
        })

        await user?.updateOne({
            comments : commentCreated
        })
        
        res.status(201).json({})
    }catch(e){
        next(e)
    }
}

export const getComments = async (req: Request, res : Response, next : NextFunction) => {
    try{
        const blogId = req.params["id"]

        const findedBlog = await BlogScheme.findById(blogId.toString())
        res.json({
            "comments" : findedBlog?.comments
        })
    }catch(e){
        next(e)
    }
} 

export const deleteComment = async (req: Request, res : Response, next : NextFunction) => {
    try{
        const commentId = req.params["id"] as string

        await CommentScheme.findById(commentId).deleteOne()
        res.status(200).json()
    }catch(e){
        next(e)
    }
}

export const updateComment = async (req: Request, res : Response, next : NextFunction) => {
    try{
        const commentId = req.params["id"] as string
        const commentBody = req.body as IComment

        await CommentScheme.findById(commentId).updateOne({
            comment : commentBody.comment
        })
        res.status(200).json()
    }catch(e){
        next(e)
    }
}