import { user } from "../Models/User.Model.js";
import { Apierror } from "../Utils/Error.js";
import { asynchandler } from "../Utils/asynchandler.js";
import jwt from "jsonwebtoken"
export const isloggedin=asynchandler(async(req,res,next)=>{
    try{
        const getaccesstoken=req?.cookies?.Accesstoken || req.header("Authorization")?.replace("Bearer"," ");
        if(!getaccesstoken){
            throw new Apierror(400,"sorry you are not logged in")
        }
        console.log(getaccesstoken);
        const decode=jwt.verify(getaccesstoken,process.env.ACCESS_TOKEN_SECRET)
        if(!decode){
            throw new Apierror(500,"sorry there some problem while checking the login status1")
        }
        console.log(decode);
        const userdetails=await user.findById(decode?._id).select("-password -refreshtoken")
        if(!userdetails){
            throw new Apierror(500,"sorry tthere is some problem in logged in checking status2")
        }
        req.user=userdetails
        next()
    }
    catch(error){
        console.log(error);
        throw new Apierror(500,"sorry there is some problem in logged in checking status3",error)
    }
})
