import mongoose,{Schema} from "mongoose"
const likeschema=new Schema({
    video:{
        type:Schema.Types.ObjectId,
        ref:"video"
    },
    likeby:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }

})
export const like=mongoose.model("like",likeschema)