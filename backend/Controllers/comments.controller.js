import { comments } from "../Models/comment.model.js";
import { asynchandler } from "../Utils/asynchandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Apierror } from "../Utils/Error.js";
import mongoose, { Mongoose } from "mongoose";
const addcomment=asynchandler( async(req,res)=>{
    const {videoid}=req.params
    const {content}=req.body;
    if(!videoid){
        throw new Apierror(400,"video id is missing")
    }
    const puttingcomment=await comments.create({
        video:videoid,
        content:content,
        userinfo:req?.user?.id
    })
    const searchcomment=await comments.findById(puttingcomment._id);
    if(!searchcomment){
        throw new Apierror(500,"there is error while creating comment")
    }
    res.status(200).json(new ApiResponse(true,200,"comment create successfully"))
})
const getvideocomment=asynchandler( async(req,res)=>{
    const {videoid}=req.params
    if(!videoid){
        throw new Apierror(400,"video id not found")
    }
    const response=await comments.find({video:videoid})
    if(!response){
        throw new Apierror(500,"comment not found")
    }
    res.status(200).json(new ApiResponse(true,200,"comments fetched succesfully",response))
})
const getvideocommentbyid=asynchandler(async(req,res)=>{
    const {videoid,userid}=req.params
    if(!videoid || !userid){
        throw new Apierror(400,"video id not found")
    }
    const convertedvideoid=new mongoose.Types.ObjectId(videoid);
    const converteduserid=new mongoose.Types.ObjectId(userid);
    const response=await comments.aggregate([
        {
            $match:{
                video:convertedvideoid
            }
        },
        {
            $match:{
                userinfo:converteduserid
            }
        },
        {
            $project:{
                content:1
            }
        }
    ])
    if(!response){
        throw new Apierror(400,"there is some error in fetching your comments")
    }
    res.status(200).json(new ApiResponse(true,200,"user comments fetched successfully",response))
})
const updatecomment=asynchandler( async(req,res)=>{
    const {commentid}=req.params
    const {content}=req.body
    if(!commentid){
        throw new Apierror(400,"comment id not found")
    }
    const updatecomment=await comments.findByIdAndUpdate(commentid,{
        $set:{
            content:content
        }
    },{new:true})
    if(!updatecomment){
        throw new Apierror(400,"there is some error in updating comments")
    }
    res.status(200).json(new ApiResponse(true,200,"comment updated successfully"))
})

const deletecomment=asynchandler( async(req,res)=>{
    const {commentid}=req.params
    if(!commentid){
        throw new Apierror(400,"comment id not found")
    }
    const deletecomment=await comments.findByIdAndDelete(commentid)
    if(!deletecomment){
        throw new Apierror(400,"there is some error in deleting comments")
    }
    res.status(200).json(new ApiResponse(true,200,"comment deleted successfully"))
      
})
const commentscount=asynchandler( async(req,res)=>{
    const {videoid}=req.params;
    if(!videoid){
        throw new Apierror(400,"video id not found")
    }
    const responsevideoid=new mongoose.Types.ObjectId(videoid)
    const response= await comments.aggregate([
        {
           $match:{
            video:responsevideoid
           }
        },
        {
            $group:{
                _id:null,
                comment:{
                    $sum:1
                }
            }
        },
        {
            $addFields:{
                commentcount:"$comment"
            }
        },
        {
            $project:{
                _id:0,
                comment:1
            }
        }
    ])
    if(!response){
        throw new ApiResponse(500,"some error while generating noofcomments")
    }
    res.status(200).json(new ApiResponse(true,200,"no of comments fetched successfully",response))
    
})
export {addcomment,getvideocomment,updatecomment,deletecomment,getvideocommentbyid,commentscount}