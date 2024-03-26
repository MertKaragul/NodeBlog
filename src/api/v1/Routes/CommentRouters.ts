import { Router } from "express";
import {createComment , deleteComment, getComments, updateComment} from "../Controllers/CommentControllers"
import { validatorMiddleware } from "../Middlewares/ValidatorMiddleware";
const commentRouter = Router()

commentRouter.get("/:id",getComments)

commentRouter.post("/:id", [validatorMiddleware] ,createComment)

commentRouter.delete("/:id", [validatorMiddleware], deleteComment)

commentRouter.put("/:id", [validatorMiddleware], updateComment)

export default commentRouter