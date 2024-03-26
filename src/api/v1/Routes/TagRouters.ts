import { Router } from "express";
import {createTag, deleteTag, getTags, updateTag} from "../Controllers/TagControllers"
import { validatorMiddleware } from "../Middlewares/ValidatorMiddleware";
import { body } from "express-validator";
const tagRouter = Router()


tagRouter.get("/", getTags)

tagRouter.post("/",[
    body("tag" , "Tagname required").notEmpty().trim(),
    validatorMiddleware
],createTag)

tagRouter.delete("/:id",[
    validatorMiddleware
],deleteTag)

tagRouter.put("/:id",[
    body("tag" , "Tagname required").notEmpty().trim(),
    validatorMiddleware
],updateTag)

export default tagRouter