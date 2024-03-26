import { Router } from "express";
import { registerController, loginController, refreshToken, userBlogs, userComments } from "../Controllers/UserControllers";
import {body} from "express-validator"
import { validatorMiddleware } from "../Middlewares/ValidatorMiddleware";
const userRouter = Router();

userRouter.post("/register",[
    body("username", "Username required").notEmpty().trim(),
    body("password", "Password required").notEmpty().trim(),
    body("email", "Email not validated").notEmpty().isEmail()
] , registerController)


userRouter.post("/login",[
    body("email", "Email required").notEmpty().isEmail(),
    body("password", "Password required").notEmpty().trim(),
] , loginController)


userRouter.post("/refreshToken", [validatorMiddleware] , refreshToken)

userRouter.get("/blogs" , [validatorMiddleware], userBlogs)

userRouter.get("/comments" , [validatorMiddleware], userComments)

export default userRouter