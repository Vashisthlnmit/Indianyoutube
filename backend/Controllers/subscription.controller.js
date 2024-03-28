import { subscriptionmodel } from "../Models/Subscription.model.js";
import { asynchandler } from "../Utils/asynchandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Apierror } from "../Utils/Error.js";
import mongoose from "mongoose"
const togglesubscription=asynchandler(async(req,res)=>{
    const {subscriberid,channelid}=req.params;
    if(!subscriberid || !channelid){
        throw new Apierror(400,"subscriberid or channelid");
    }
    const response=await subscriptionmodel.findOne({Subscriber:subscriberid,channel:channelid});
    if(response==null){
        const resp=await subscriptionmodel.create({
            Subscriber:subscriberid,
            channel:channelid
        })
        if(!resp){
            throw new Apierror(500,"sorry there is some error while subscribing")
        }
        return res.status(200).json(new ApiResponse(true,200,"channel subscribered successfully"))
    }
    else{
        const resp=await subscriptionmodel.findOneAndDelete({Subscriber:subscriberid,channel:channelid});
        if(!resp){
            throw new Apierror(500,"sorry there is some error while unsubsrbing the channel")
        }
        return res.status(200).json(new ApiResponse(false,200,"channel unsubcribered successfully"))
    }
})
const nofsubscriber = asynchandler(async (req, res) => {
    const { channelid } = req.params
    if (!channelid) {
        throw new Apierror(400, "videoid is missing")
    }
    const convertedid= new mongoose.Types.ObjectId(channelid)
    const response = await subscriptionmodel.aggregate([
        {
            $match: {
                channel: convertedid
            }
        },
        {
            $group: {
                _id: null,
                totalsubscriber: {
                    $sum: 1
                }
            }
        },
        {
            $addFields:{
                liked:"$totalsubscriber"
            }
        },
        {
            $project: {
                _id: 0,
                totalsubscriber: 1
            }
        }
    ])
    if(!response){
        throw new Apierror(500,"there is problem while rendering total subscriber")
    }
    res.status(200).json(new ApiResponse(200,true,response))
})
const checksubscriber=asynchandler(async(req,res)=>{
    const {subscriberid,channelid}=req.params;
    if(!subscriberid || !channelid){
        throw new Apierror(400,"subscriberid or channelid");
    }
    const resp=await subscriptionmodel.findOne({Subscriber:subscriberid,channel:channelid});
    if(resp==null){
        return res.status(200).json(new ApiResponse(false,200));
    }
    return res.status(200).json(new ApiResponse(true,200));
})
export{togglesubscription,nofsubscriber,checksubscriber}