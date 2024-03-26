import { Schema} from "mongoose";

const BlogEntites = new Schema({
    title: String,
    description: String,
    shortDescription: String,
    image: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "CommentModel"
    }],
    tags: [{
        type: Schema.Types.ObjectId,
        ref: "TagModel"
    }]
});

export default BlogEntites