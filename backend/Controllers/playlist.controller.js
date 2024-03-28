import { asynchandler } from "../Utils/asynchandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Apierror } from "../Utils/Error.js";
import { playlist } from "../Models/playlist.model.js";
import {user} from "../Models/User.Model.js"
import mongoose from "mongoose";
const createplaylist=asynchandler(async (req,res)=>{
    const {title, description}=req.body;
    if(!title || !description){
        throw new Apierror(400," some entries are missing")
    }
    const playlistcreation=await playlist.create({
        title:title,
        description:description,
        owner:req?.user?._id
    })
    const searchplaylist=await playlist.findById(playlistcreation._id);
    if(!searchplaylist){
        throw new Apierror(500,"sorry there is some problem while creating playlist")
    }
    return res.status(200).json(new ApiResponse(true,200,"playlist created successfully",searchplaylist))
})
const getplaylistbyid=asynchandler( async(req,res)=>{
    const {playlistid}=req.params
    const getplaylist=await playlist.findById(playlistid);
    if(!getplaylist){
        throw new Apierror(400,"sorry this playlist does not exist")
    }
    res.status(200).json(new ApiResponse(true,200,"playlist fetched successfully",getplaylist))
})
const getplaylistcreatedbyuser=asynchandler( async(req,res)=>{
    const {userid}=req.params;
    const mongoseid=new mongoose.Types.ObjectId(userid)
    const response=await user.aggregate([
        {
            $match:{
                _id:mongoseid
            }
        },
        {
            $lookup:{
                from:"playlists",
                localField: '_id',
                foreignField: 'owner',
                as: "playlist"
            }
        
        },
        {
            $addFields:{
                allplaylist:"$playlist"
            }
        }
       
    ])
    if(!response){
        throw new Apierror(500,"sorry there is some while fetching playlist")
    }
    res.status(200).json(new ApiResponse(true,200,"users playlist fetched successfully",response))
})
const updateplaylist=asynchandler( async(req,res)=>{
    const {playlistid}=req.params
    const {title,description}=req.body
    if(!title || !description){
        throw new Apierror(400,"some entries are missing for updating")
    }
    const updatedplaylist=await playlist.findByIdAndUpdate(playlistid,{
        $set:{
            title:title,
            description:description
        }
    },{new:true})
    if(!updatedplaylist){
        throw new Apierror(500,"sorry this playlist does not exist")
    }
    res.status(200).json(new ApiResponse(true,200,"playlist updated successfully",updatedplaylist))
})
const addvideotoplaylist=asynchandler( async(req,res)=>{
    const {playlistid,videoid}=req.params
    if(!playlistid || !videoid){
        throw new Apierror(400,"playlistid or videoid is missing")
    }
    const findplaylist=await playlist.findById(playlistid)
    if(!findplaylist){
        throw new Apierror(400,"sorry this playlist does not exist")
    }
    findplaylist.videos.push(videoid)
    findplaylist.save({validateBeforeSave:false})
    res.status(200).json(new ApiResponse(true,200,"video added successfully "))
})
const deleteplaylist=asynchandler( async(req,res)=>{
    const {playlistid}=req.params
    if(!playlistid){
        throw new Apierror(400,"playlist not found")
    }
    const deleteplaylist=await playlist.findByIdAndDelete(playlistid)
    if(!deleteplaylist){
        throw new Apierror(400,"there is some error while deleting playlist")
    }
    res.status(200).json(new ApiResponse(true,200,"playlist deleted successfully",deleteplaylist))
})
export {createplaylist,deleteplaylist,getplaylistbyid,getplaylistcreatedbyuser,updateplaylist,addvideotoplaylist}
// //[
//   {
//     $lookup: {
//       from: 'playlists',
//       localField: '_id',
//       foreignField: 'owner',
//       as: "hope"
//     }
//   },
//   {
//     $addFields: {
//       hope: "$hope"
//     }
//   }
// ]
// {
//     $match:{
//         _id:userid
//     }
// },
// {
//     $lookup:{
//         from:"playlists",
//         localField: '_id',
//         foreignField: 'owner',
//         as: "playlist"
//     }

// },
// {
//     $addFields:{
//         allplaylist:"$playlist"
//     }
// }