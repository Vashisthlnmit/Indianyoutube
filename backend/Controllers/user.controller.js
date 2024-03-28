import { asynchandler } from "../Utils/asynchandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Apierror } from "../Utils/Error.js";
import { deleteoncloudinary, uploadoncloudinary } from "../Utils/Cloudinary.js";
import { user } from "../Models/User.Model.js";
import { options } from "../Utils/constanst.js";
import mongoose from "mongoose"
const signup = asynchandler(async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            throw new Apierror(400, "some fields are missing")
        }
        const existeduser = await user.findOne({ email });
        if (existeduser) {
            throw new Apierror(400, "user already existed")
        }
        const avatar = req?.file?.path
        console.log(avatar);
        if (!avatar) {
            throw new Apierror(400, "file might not got")
        }
        const response = await uploadoncloudinary(avatar);
        const newuser = await user.create({
            username: username,
            email: email,
            avatar: response.secure_url,
            password: password
        })
        const findnewuser = await user.findById(newuser._id);
        if (!findnewuser) {
            throw new Apierror(500, "there is some error while creating account")
        }
        return res.status(200).json(
            new ApiResponse(true, 200, "user is registered successfully")
        )
    }
    catch (error) {
        console.log(error);
        throw new Apierror(500, "there is some error", error)
    }
})
const signin = asynchandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Apierror(400, "some entries are missing")
        }
        const checkuser = await user.findOne({ email })
        if (!checkuser) {
            throw new Apierror(400, " sorry this user doesnot exist")
        }
        const checkpassword = await checkuser.ComparePassword(password);
        if (!checkpassword) {
            throw new Apierror(400, " sorry the password is incorrect")
        }
        const accesstoken = await checkuser.Generateaccesstoken();
        const refreshtoken = await checkuser.Generaterefreshtoken();
        if (!accesstoken || !refreshtoken) {
            throw new Apierror(500, "there is some error from server side while generating the token")
        }
        checkuser.refreshtoken = refreshtoken;
        await checkuser.save({ validateBeforeSave: false })
        const loginuser = await user.findById(checkuser._id).select('-password -refreshtoken -watchistory');

        res.status(200)
            .cookie("Accesstoken", accesstoken, options)
            .cookie("Refreshtoken", refreshtoken, options)
            .json(new ApiResponse(true, 200, "user is successfully login", loginuser))    
    }
    catch (error) {
        console.log(error);
        throw new Apierror(500, "there is some error", error)
    }
})
const logout = asynchandler(async (req, res) => {
    try {
        console.log(req.user);
        await user.findByIdAndUpdate(req.user._id, {
            $unset: {
                refreshtoken: 1
            }
        },
            {
                new: true
            }
        )
        return res.status(200)
            .clearCookie("Accesstoken", options)
            .clearCookie("Refreshtoken", options)
            .json(
                new ApiResponse(true, 200, "user is successfully logged")
            )
    }
    catch (error) {
        console.log(error);
        throw new Apierror(500, "there is some error", error)
    }
})
const getuserprofile = asynchandler(async (req, res) => {
    try {
        const userprofile = await user.findById(req.user?._id).select("-password -refreshtoken");
        if (!userprofile) {
            throw new Apierror(500, "there is some error while user details")
        }
        return res.status(200).json(new ApiResponse(true, 200, "user details fetched successfully", userprofile))
    }
    catch (error) {
        console.log(error);
        throw new Apierror(500, "there is some error while fetching userprofile", error)
    }
})
const updateavatarprofile = asynchandler(async (req, res) => {
    try {
        const userprofile = await user.findById(req.user?._id)
        if (!userprofile) {
            throw new Apierror(500, "there is some error while updating avatar")
        }
        const oldurl = req.user?.avatar
        const avatar = req?.file?.path
        if (!avatar) {
            throw new Apierror(400, "file not found")
        }
        const updatedresponse = await uploadoncloudinary(avatar)
        if (!updatedresponse) {
            throw new Apierror(500, "sorry there is some error from server")
        }
        await user.findByIdAndUpdate(req.user?._id,
            {
                $set: {
                    avatar: updatedresponse.secure_url
                }
            }, { new: true })
        const deleteresponse=await deleteoncloudinary(oldurl)
        res.status(200).json( new ApiResponse(true,200,"user avatar has been updated "))    
    }
    catch (error) {
        console.log(error);
        throw new Apierror(500, "there is some error while updating avatar", error)
    }
})
const changepassword=asynchandler(async (req,res)=>{
    try{
        const {oldpassword,newpassword}=req.body
        if(!oldpassword || !newpassword){
            throw new Apierror(400,"some fields are missing")
        }
        const getuser=await user.findById(req.user?._id)
        if(!getuser){
            throw new Apierror(500,"some error while changing password")
        }
        const check=getuser.ComparePassword(oldpassword)
        if(!check){
            throw new Apierror(400,"oldpassword is incorrect")
        }
        getuser.password=newpassword
        getuser.save({validateBeforeSave:false})
        res.status(200).json(new ApiResponse(true,200,"password updated successfully"))
    }
    catch(error){
        console.log(error);
        throw new Apierror(500,"sorry there is error while changing password")
    }
})
const updateuserdetails=asynchandler(async (req,res)=>{
    try{
        const {username,email}=req.body;
        console.log(username,email);
        if(!email || !username){
            throw new Apierror(400,"sorry some fields are missing")
        }
        const updateuser=await user.findByIdAndUpdate(req.user?._id,{
            $set:{
                username:username,
                email:email
            }
        },{new:true}).select("-password")
        res.status(200,"user profile have been updated successfully")
    }
    catch(error){
        console.log(error);
        throw new Apierror(500)
    }
})
const getchannelprofile=asynchandler(async (req,res)=>{
    const {userid}=req.params
    if(!userid){
        throw new Apierror(500,"sorry user is missing")
    }
    const useridcopy=new mongoose.Types.ObjectId(userid);
    const channel=await user.aggregate([
        {
            $match:{
                _id:useridcopy
            },
        },
        {
            $lookup:{
                from:"subscriptionmodels",
                localField:"_id",
                foreignField:"channel",
                as:"subscribers"
            }
        },
        {
            $lookup:{
                from:"subscriptionmodels",
                localField:"_id",
                foreignField:"Subscriber",
                as:"subscribedto"
            }
        },
        {
            $addFields:{
                subscriberCount:{
                    $size: "$subscribers"
                },
                channelsubscribetoo:{
                    $size: "$subscribedto"
                },
                // isSubscribed:{
                //     $cond:{
                //         if:{$in: [req.user?._id,"$subscribers."]},
                //         then:true,
                //         else:false,
                //     }
                // }
            }
        },
        {
            $project:{
                username:1,
                email:1,
                avatar:1,
                subscribers:1,
                subscribedto:1,
                subscriberCount:1,
                channelsubscribetoo:1,

            }
        }

    ])
    if(!channel?.length){
        throw new Apierror(404,"channel does not exist")
    }
    return res.status(200).json(new ApiResponse(true,200,"User channel fetched successfully",channel))
})
export { signup, signin, logout, getuserprofile, updateavatarprofile,updateuserdetails,getchannelprofile}