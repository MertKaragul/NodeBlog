import mongoose from "mongoose";
import BlogEntites from "../../Model/Entities/BlogEntities";
import { TagEntities } from "../../Model/Entities/TagEntites";
import CommentEntites from "../../Model/Entities/CommentEntities";
import UserEntities from "../../Model/Entities/UserEntities";


mongoose.connect(String(process.env.CONNECTIONSTRING + "" + process.env.DATABASE))

export const BlogScheme = mongoose.model("BlogModel", BlogEntites)
export const TagScheme = mongoose.model("TagModel", TagEntities)
export const CommentScheme = mongoose.model("CommentModel", CommentEntites)
export const UserScheme = mongoose.model("UserModel", UserEntities)


export default mongoose