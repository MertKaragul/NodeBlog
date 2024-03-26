import { Schema } from "mongoose";

const CommentEntites =  new Schema({
    comment : String,
    author : {
        type : Schema.Types.ObjectId,
        ref : "UserModel"
    },
    blogs : {
        type : Schema.Types.ObjectId,
        ref : "BlogModel"
    }
})

export default CommentEntites