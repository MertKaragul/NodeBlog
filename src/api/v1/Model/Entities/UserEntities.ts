import {Schema} from "mongoose";
import UserRoles from "../Enums/UserRole";

const UserEntities = new Schema({
    username : String,
    password : String,
    email : String,
    role : {
        type : String,
        enum:[`${UserRoles.ADMIN}`,`${UserRoles.USER}`],
        default : `${UserRoles.USER}`
    },
    
    blogs:[{
        type: Schema.Types.ObjectId,
        ref: "BlogModel",
    }],

    comments : [{
        type: Schema.Types.ObjectId,
        ref: "CommentModel",
    }]
})

export default UserEntities