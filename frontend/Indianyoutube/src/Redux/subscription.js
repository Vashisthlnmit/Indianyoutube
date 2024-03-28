import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios"
const intialstate=[];
const subscriptionslice=createSlice({
    name:"subscqueries",
    initialState:intialstate,
    reducers:{},
    // extraReducers:(builder)=>{
    //     builder.addCase(commentsonvideo.fulfilled,(state,action)=>{
    //         console.log(action);
    //         state.push(action?.payload?.data?.data)
    //     })
    // }
})
const togglesubscription=createAsyncThunk('/api/sub',async(data)=>{
    try{
        const resp=axios.post(`/api/sub/${data?.subscriberid}/${data?.channelid}`);
        toast.promise(resp,{
            loading:"please wait while fetching your playlist",
            success:(successdata)=>{
                return successdata?.data?.message
            },
            error:(err)=>{
                return err?.response?.data
            }
        })
        return await resp
    }
    catch(error){
        console.log(error);
        toast.error(error);
    }

})
const nofsubscriber=createAsyncThunk('/api/tub',async(data)=>{
    console.log(data);
    try{
        const resp=axios.get(`/api/sub/${data}`);
        toast.promise(resp,{
            loading:"please wait we are fetching nofsubscriber",
            success:"no of subscriber fetched successfully",
            error:(err)=>{
                return err?.response?.data
            }
        })
        return await resp
    }
    catch(error){
        console.log(error);
    }

})
const checksubscriber=createAsyncThunk('/api/check',async(data)=>{
    console.log(data);
    try{
        const resp=axios.get(`/api/sub/${data?.subscriberid}/${data?.channelid}`);
        toast.promise(resp,{
            loading:"please wait while fetching your playlist",
            success:"checking the subscription",
            error:(err)=>{
                return err?.response?.data
            }
        })
        return await resp
    }
    catch(error){
        console.log(error);
        toast.error(error);
    }

})
export {nofsubscriber,togglesubscription,checksubscriber}
export default subscriptionslice.reducer