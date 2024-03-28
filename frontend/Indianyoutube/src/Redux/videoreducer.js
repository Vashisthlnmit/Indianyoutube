import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
const intialstate=[];
const videostuff=createSlice({
    name:"videomaterial",
    initialState:intialstate,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getallvideo.fulfilled,(state,action)=>{
            console.log(action);
            state.push(action?.payload?.data?.data)
        })
    }
})
export const getallvideo=createAsyncThunk('/hope',async()=>{
    try{
        const resp=axios.get('/api/video/');
        toast.promise(resp,{
            loading:"please wait fetching your videos",
            success:"video fetched successfully",
            error:(err)=>{
                return err?.response?.data
            }
        })
        const respo=await resp;
        return respo;
    }
    catch(error){
        toast.error(error)
        console.log(error);
    }
})
export const getvideobyid=createAsyncThunk('/wope',async(data)=>{
    console.log(data);
    try{
        const resp=axios.get(`/api/video/${data}`);
        toast.promise(resp,{
            loading:"please wait fetching your required video",
            success:"video fetched successfully",
            error:(err)=>{
                return err?.response?.data
            }
        })
        return await resp
    }
    catch(error){
        toast.error(error)
        console.log(error)
    }
})
export const deletevideo=createAsyncThunk('/wope',async(data)=>{
    console.log(data);
    try{
        const resp=axios.delete(`/api/video/${data}`);
        toast.promise(resp,{
            loading:"please wait deleting  your required video",
            success:"video deleted successfully",
            error:(err)=>{
                return err?.response?.data
            }
        })
        return await resp
    }
    catch(error){
        toast.error(error)
        console.log(error)
    }
})
export const createvideo=createAsyncThunk('/create',async(data)=>{
    try{
        const resp=axios.post('/api/createvideo',data);
        toast.promise(resp,{
            loading:"please while video is begining created",
            success:"video created successfully",
            error:(err)=>{
                return err?.response?.data
            }
        })
        return await resp
    }
    catch(error){
        toast.error(error)
        console.log(error)
    }
})
export const updatevideo=createAsyncThunk('/another',async(data)=>{
    console.log(data.videoid);
    const form=new FormData();
    form.append("title",data.title);
    form.append("Description",data.Description);
    form.append("videothumbnail",data.videothumbnail);
    console.log(data);
    try{
        const resp=axios.patch(`/api/video/${data?.videoid}`,form)
        toast.promise(resp,{
            loading:"please wait video is begining update",
            success:"video updated successfully",
            error:(err)=>{
                return err?.response?.data
            }
        })
        return await resp
    }
    catch(error){
        toast.error(error),
        console.log(error);
    }
})
export const getvideobyuserid=createAsyncThunk('/wope',async(data)=>{
    console.log(data);
    try{
        const resp=axios.get(`/api/video/user/${data}`);
        toast.promise(resp,{
            loading:"please wait fetching your required video",
            success:"video by the user fetched successfully",
            error:(err)=>{
                return err?.response?.data
            }
        })
        return await resp
    }
    catch(error){
        toast.error(error)
        console.log(error)
    }
})
export const publishavideo=createAsyncThunk('/wope',async(data)=>{
    const form=new FormData();
    form.append("title",data.title);
    form.append("Description",data.Description);
    form.append("videothumbnail",data.videothumbnail);
    form.append("videofile",data.videofile);
    console.log(data);
    try{
        const resp=axios.post(`/api/video/createvideo`,form);
        toast.promise(resp,{
            loading:"please wait fetching your required video",
            success: "video added successfully",
            error:(err)=>{
                return err?.response?.data
            }
        })
        return await resp
    }
    catch(error){
        toast.error(error)
        console.log(error)
    }
})
export default videostuff.reducer
