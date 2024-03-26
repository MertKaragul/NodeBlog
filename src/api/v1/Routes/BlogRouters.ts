import { Router } from "express" ;
const blogRouter = Router()
import {insertBlog, getBlogs, blogDetail, deleteBlog, blogFilter} from "../Controllers/BlogControllers"
import { validatorMiddleware } from "../Middlewares/ValidatorMiddleware";
import {body} from "express-validator"

blogRouter.get("/",getBlogs)

blogRouter.post("/", [
    body("title", "Title required").notEmpty().trim(),
    body("description","Description required").notEmpty().trim(),
    body("shortDescription", "Short description required").notEmpty().trim(),
    body("image","Image required").notEmpty().trim(),
    validatorMiddleware
] ,insertBlog)

blogRouter.get("/filter", blogFilter)

blogRouter.get("/:id", blogDetail)

blogRouter.post("/:id",[validatorMiddleware] ,deleteBlog)



export default blogRouter