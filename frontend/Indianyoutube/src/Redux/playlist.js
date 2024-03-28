import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios"
const intialstate=[];
const playlistslice=createSlice({
    name:"playlist",
    initialState:intialstate,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getplaylistbyuser.fulfilled,(state,action)=>{
            console.log(action);
            state.push(action?.payload?.data?.data)
        })
    }
})
const getplaylistbyuser=createAsyncThunk('/api/playlist',async(data)=>{
    try{
        const resp=axios.get(`/api/playlist/use/${data}`);
        toast.promise(resp,{
            loading:"please wait while fetching your playlist",
            success:"playlist fetched successfully ",
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
const createplaylist=createAsyncThunk('/api/playlist/create',async(data)=>{
    try{
        const respo=axios.post('/api/playlist/create',data);
        toast.promise(respo,{
            loading:"please wait creating playlist",
            success:"playlist created successfully fetched successfully",
            error:(err)=>{
                return err?.response?.data
            }
        })
        return await respo
    }
    catch(error){
        console.log(error);
        toast.error(error)
    }
})
const updateplaylist=createAsyncThunk('/api/crud',async(data)=>{
    console.log(data);
    try{
        const resp=axios.patch(`/api/playlist/crud/${data.playlistid}`,data);
        toast.promise(resp,{
            loading:"please wait updating playlist",
            success:"playlist updated successfully ",
            error:(err)=>{
                return err?.response?.data
            }
        })
        return await resp;
    }
    catch(error){
        console.log(error);
        toast.error(error);
    }
})
const deleteplaylist=createAsyncThunk('/api/crud/delete',async(data)=>{
    try{
        const resp= axios.delete(`/api/playlist/crud/${data}`);
        toast.promise(resp,{
            loading:"please wait deleting playlist",
            success:(output)=>{
                "playlist deleted successfully";
            },
            error:(err)=>{
                return err?.response?.data
            }
        })
        return await resp;
    }
    catch(error){
        console.log(error);
        toast.error(error)
    }
})
const addvideotoplaylist=createAsyncThunk('/api/crud/addvideotoplaylist',async(data)=>{
    try{
        console.log(data);
        const resp= axios.post(`/api/playlist/addvideo/${data.playlistid}/${data.videoid}`);
        toast.promise(resp,{
            loading:"please wait while adding video to playlist",
            success:"video added successfully into playlist",
            error:(err)=>{
                return err?.response?.data
            }
        })
        return await resp;
    }
    catch(error){
        toast.error(error)
    }
})
export default playlistslice.reducer
export {getplaylistbyuser,createplaylist,updateplaylist,deleteplaylist,addvideotoplaylist};