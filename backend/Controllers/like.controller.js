import { ApiResponse } from "../Utils/ApiResponse.js";
import { Apierror } from "../Utils/Error.js";
import { like } from "../Models/likes.model.js";
import { asynchandler } from "../Utils/asynchandler.js";
import mongoose from "mongoose";
const tooglevideolike = asynchandler(async (req, res) => {
    const { videoid } = req.params
    if (!videoid) {
        throw new Apierror(400, "videoid is missing")
    }
    const response = await like.find({video:videoid, likeby: req?.user?._id })
    if (response?.length == 0) {
        const createlike = await like.create({
            video: videoid,
            likeby: req?.user?._id
        })
        if (!createlike) {
            throw new Apierror(false, "video cannot be liked by")
        }
        res.status(200).json(new ApiResponse(true, 200, "video liked successfully"))
    }
    else {
        console.log(response);
        const respon = await like.findByIdAndDelete(response[0]?._id);
        if (!respon) {
            throw new Apierror(400, "there is some error while disliking the video")
        }
        res.status(200).json(new ApiResponse(false, 200, "video disliked successfully"))
    }
})
const noflikes = asynchandler(async (req, res) => {
    const { videoid } = req.params
    if (!videoid) {
        throw new Apierror(400, "videoid is missing")
    }
    const convertedid= new mongoose.Types.ObjectId(videoid)
    const response = await like.aggregate([
        {
            $match: {
                video: convertedid
            }
        },
        {
            $group: {
                _id: null,
                likes: {
                    $sum: 1
                }
            }
        },
        {
            $addFields:{
                liked:"$likes"
            }
        },
        {
            $project: {
                _id: 0,
                likes: 1
            }
        }
    ])
    if(!response){
        throw new Apierror(500,"there is problem while rendering no of likes")
    }
    res.status(200).json(new ApiResponse(200,true,response))
})
const checklike=asynchandler(async(req,res)=>{
    const { videoid } = req.params
    if (!videoid) {
        throw new Apierror(400, "videoid is missing")
    }
    const resp=await like.find({video:videoid,likeby:req?.user?._id});
    if(resp==null){
        return res.status(200).json(new ApiResponse(false,200));
    }
    return res.status(200).json(new ApiResponse(true,200));
})
export { tooglevideolike, noflikes,checklike }
