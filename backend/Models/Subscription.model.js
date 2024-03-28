import mongoose,{Schema} from "mongoose";
import { user } from "./User.Model.js";
const subscriptionschema=new Schema({
    Subscriber:{
        type:Schema.Types.ObjectId,
        ref:user
    },
    channel:{
        type:Schema.Types.ObjectId,
        ref:user
    }
},{timestamps:true})
export const subscriptionmodel=mongoose.model("subscriptionmodel",subscriptionschema)