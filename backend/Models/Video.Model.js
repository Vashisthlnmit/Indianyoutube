import mongoose,{Schema} from "mongoose";
import { user } from "./User.Model.js";
const videoschema=new Schema({
    title:{
        type:String,
        required:true
    },
    videofile:{
        type:String,
        required:true
    },
    videothumbnail:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
    },
    Description:{
        type:String,
    },
    views:{
        type:Number,
    },
    isPublished:{
        type:Boolean
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref:user
    }

},{timestamps:true})
const video=mongoose.model("video",videoschema)
export default video