import video from "../Models/Video.Model.js";
import { asynchandler } from "../Utils/asynchandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Apierror } from "../Utils/Error.js";
import { uploadoncloudinary } from "../Utils/Cloudinary.js";
import mongoose from "mongoose"
const getallvideo=asynchandler(async (req,res)=>{
    const response=await video.find({}).select("-duration -isPublished")
    if(!response){
        throw new Apierror(500,"there is some error while fetching videos")
    }
    res.status(200).json(new ApiResponse(true,200,"videos are fetched successfully",response))
})
const getvideobyid=asynchandler(async (req,res)=>{
    const {videoid}=req.params;
    if(!videoid){
        throw new Apierror(500,"sorry video id not found")
    }
    const response=await video.findById(videoid).select("-isPublished");
    if(!response){
        throw new Apierror(500,"video not found")
    }
    res.status(200).json(new ApiResponse(true,200,"video fetched successfully",response))
})
const updatevideo=asynchandler( async(req,res)=>{
    const {title,Description}=req.body;
    const {videoid}=req.params;
    if(!title || !Description){
        throw new Apierror(400,"some fields are missing")
    }
    console.log(req?.file);
    if(!req.file){
        throw new Apierror(200,"videothumbnail is missing")
    }
    const localfilepath=req?.file?.path
    const response=await uploadoncloudinary(localfilepath);
    if(!response){
        throw new Apierror(500,"some error while uploading on server")
    }
    const videoupdate=await video.findByIdAndUpdate(videoid,{
        $set:{
            title:title,
            Description:Description,
            videothumbnail:response.secure_url,
        }
    },{new:true}).select("-owner -isPublished")
    if(!videoupdate){
        throw new Apierror(500,"some error while updating the video")
    }
    res.status(200).json(new ApiResponse(true,200,"details are updated successfully"))
})
const deletevideo=asynchandler(async (req,res)=>{
    const {videoid}=req.params;
    if(!videoid){
        throw new Apierror(404,"videoid is missing");
    }
    const response=await video.findByIdAndDelete(videoid);
    if(!response){
        throw new Apierror(500,"some error while deleting the video");
    }
    res.status(200).json(new ApiResponse(true,200,"video deleted successfully"))
})
const publishavideo=asynchandler(async (req,res)=>{
    const {title,Description}=req.body;
    if(!title || !Description){
        throw new Apierror("some fields are missing")
    }
    const videothumbnail=req?.files?.videothumbnail[0]?.path
    const videofile=req?.files?.videofile[0]?.path
    if(!videothumbnail || !videofile){
        throw new Apierror(400,"videothumbnail or videofile is missing")
    }
    const thumbnailresponse=await uploadoncloudinary(videothumbnail);
    const videoresponse=await uploadoncloudinary(videofile);
    if(!thumbnailresponse || !videoresponse){
        throw new Apierror(500,"sorry there is some error uploading video or videothumbnail")
    }
    const videocreate=await video.create({
        title:title,
        Description:Description,
        videothumbnail:thumbnailresponse.secure_url,
        videofile:videoresponse.secure_url,
        isPublished:true,
        owner:req?.user?._id
    })
    const videoconfirm=await video.findById(videocreate._id);
    if(!videoconfirm){
        throw new Apierror(500,"sorry there is some error while creating video")
    }
    res.status(200).json(new ApiResponse(true,200,"video is created successfully"))
})
const getvideobyuser=asynchandler(async (req,res)=>{
    const {userid}=req.params;
    if(!userid){
        throw new Apierror(500,"sorry video id not found")
    }
    const newuserid=new mongoose.Types.ObjectId(userid)
    const response=await video.aggregate([
        {
            $match:{
                owner:newuserid
            }
        }
    ]);
    if(!response){
        throw new Apierror(500,"video not found")
    }
    res.status(200).json(new ApiResponse(true,200,"video fetched successfully",response))
})
export{publishavideo,getallvideo,getvideobyid,updatevideo,getvideobyuser,deletevideo}