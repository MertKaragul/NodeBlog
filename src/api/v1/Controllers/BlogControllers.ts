import { Request,Response,NextFunction } from "express"
import ErrorModel from "../Model/Model/ErrorModel"
import { BlogScheme, UserScheme, CommentScheme, TagScheme } from "../Services/Database/DatabaseServices"
import ResponseMessage from "../Model/Model/ResponseMessage"
import { validationResult } from "express-validator"
import UserRoles from "../Model/Enums/UserRole"


interface IInsertBlog{
    title : string
    description : string
    shortDescription : string
    image : string,
    tags : []
}


export const getBlogs = async (req : Request, res:Response, next : NextFunction) => {
    try{
        const query = new Map(Object.entries(req.query))
        var filter : any = {}
        
        query.forEach((value, key) => {
            const stringValue = value as string
            if(stringValue.split("-").length > 0){
                const clearString = stringValue.split("-")
                filter[key] = {$in : clearString}
            }else{
                filter[key] = {$in : value}
            }
        })


        const blogs = await BlogScheme
        .find(filter, "title image shortDescription author tags")
        .populate({path : "author", select : "username"})
        .populate({path : "tags"})
        .exec()

        return res
        .status(200)
        .json({
            blogs : blogs
        })
        
    }catch(e){
        next(e)
    }
}

export const insertBlog = async (req : Request, res:Response, next : NextFunction) => {
    try{
        const validateBlogInputs = validationResult(req)
        if(!validateBlogInputs.isEmpty()){
            return res
            .status(400)
            .json({
                errors : validateBlogInputs.array().map((e) => e.msg)
            })
        }

        const blog = req.body as IInsertBlog
        const user = await UserScheme.findById(res.locals.userId) 

        if(user?.role != UserRoles.ADMIN.toString()){
            next(new ErrorModel("Only Admin is Authorized!" , 401))
        }

        const tags = await TagScheme.find({
            "_id": {$in : blog.tags}
        })

        const blogCreated = await BlogScheme.create({
            title : blog.title,
            description : blog.description,
            shortDescription : blog.shortDescription,
            image : blog.image,
            tags : tags,
            comments : [],
            author : user
        })

        await user?.updateOne({
            blogs : blogCreated
        })
                
        res.json(new ResponseMessage("Blog Successfully created" , 200))
    }catch(e){
        next(e)
    }
}

export const deleteBlog = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const blogId = req.params["id"]
        const userId = res.locals.userId
        const findUser = await UserScheme.findById(userId)
        if(findUser?.role != UserRoles.ADMIN.toString() ){
            next(new ErrorModel("Only Admin is authorized" , 401))
        }
        await BlogScheme.findById(blogId).deleteOne()

        res.status(200)
        .json(new ResponseMessage("Blog successfully deleted" , 200))
    }catch(e){
        next(e)
    }
}

export const blogDetail = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const blogId = req.params.id

        const blog = await BlogScheme
        .findById(blogId, "title description shortDescription image userModel tagModel")
        .populate({path : "author", select : "username"})
        .populate({path : "tags"})
        .exec()

        const comments = await CommentScheme.find({blogs : blog?._id}, "comment userModel")
        .populate({path : "author", select : "username"})
        .exec()

        res
        .json({
            "blogs" : blog,
            "comments" : comments
        })
    }catch(e){
        next(e)
    }
}


export const blogFilter = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const queryParams = req.query
        console.log(queryParams)
        res.status(200).json()
    }catch(e){
        next(e)
        console.error(e)
    }
}