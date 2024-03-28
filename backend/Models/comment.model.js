import mongoose,{Schema} from "mongoose";
const commentmodel=new Schema({
    video:{
        type:Schema.Types.ObjectId,
        ref:"video"
    },
    content:{
        type:String,
        required:true
    },
    userinfo:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
})
export const comments=mongoose.model("comments",commentmodel)