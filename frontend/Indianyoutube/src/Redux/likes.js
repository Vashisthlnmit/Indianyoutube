import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios"
const intialstate=[];
const likeslice=createSlice({
    name:"likes",
    initialState:intialstate,
    reducers:{},
    // extraReducers:(builder)=>{
    //     builder.addCase(getplaylistbyuser.fulfilled,(state,action)=>{
    //         console.log(action);
    //         state.push(action?.payload?.data?.data)
    //     })
    // }
})
const tooglelike=createAsyncThunk('/api/like',async(data)=>{
    try{
        const resp=axios.post(`/api/like/${data}`);
        toast.promise(resp,{
            loading:"please wait while liking video",
            success:(response)=>{
                return response?.data?.message
            },
            error:(err)=>{
                return err?.response?.data
            }
        })
        return await resp
    }
    catch(error){
        console.log(error);
        toast.error(error)
    }
})
const nolikes=createAsyncThunk('/api/numberlike',async(data)=>{
    try{
        const resp=axios.get(`/api/like/${data}`);
        toast.promise(resp,{
            loading:"please wait while liking video",
            success:"no of likes fetched successfully",
            error:(err)=>{
                return err?.response?.data
            }
        })
        return await resp
    }
    catch(error){
        console.log(error);
        toast.error(error)
    }
})
const checklike=createAsyncThunk('/api/likecheck',async(data)=>{
    try{
        const resp=axios.get(`/api/like/check/${data}`);
        toast.promise(resp,{
            loading:"please wait while liking video",
            success:"subscribed the comment successfully",
            error:(err)=>{
                return err?.response?.data
            }
        })
        return await resp
    }
    catch(error){
        console.log(error);
        toast.error(error)
    }
})
export {tooglelike,nolikes,checklike}
export default likeslice.reducer