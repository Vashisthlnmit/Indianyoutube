import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios"
const intialstate=[];
const commentslice=createSlice({
    name:"commentqueries",
    initialState:intialstate,
    reducers:{},
    // extraReducers:(builder)=>{
    //     builder.addCase(commentsonvideo.fulfilled,(state,action)=>{
    //         console.log(action);
    //         state.push(action?.payload?.data?.data)
    //     })
    // }
})
const commentsonvideo=createAsyncThunk('/api/comments',async(data)=>{
    try{
        const resp=axios.get(`/api/comments/commentcreateget/${data}`);
        toast.promise(resp,{
            loading:"please wait while fetching your playlist",
            success:  "comments are sucessfully fetched",
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
const addcommentonvideo=createAsyncThunk('/api/comments',async(data)=>{
    console.log(data);
    try{
        const resp=axios.post(`/api/comments/commentcreateget/${data.videoid}`,{content:data.content});
        toast.promise(resp,{
            loading:"please wait while fetching your playlist",
            success: "comments are added successfully",
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
const deletecomment=createAsyncThunk('/api/comments',async(data)=>{
    console.log(data);
    try{
        const resp=axios.delete(`/api/comments/deletationofcomments/${data}`);
        toast.promise(resp,{
            loading:"please wait while fetching your playlist",
            success: "comments are deleted  successfully",
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
const getcommentbyid=createAsyncThunk('/api/comments',async(data)=>{
    try{
        const resp=axios.get(`/api/comments/commentbyuser/${data?.videoid}/${data?.userid}`);
        toast.promise(resp,{
            loading:"please wait while fetching your comment",
            success:"comment by id fetched successfully",
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
const updatecomment=createAsyncThunk('/api/comments',async(data)=>{
    console.log(data);
    try{
        const resp=axios.patch(`/api/comments/updationofcomments/${data.commentid}`,data);
        toast.promise(resp,{
            loading:"please wait while fetching your comment",
            success: "comments are updated successfully",
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
const noofcomments=createAsyncThunk('/api/comments',async(data)=>{
    console.log(data);
    try{
        const resp=axios.get(`/api/comments/countingcomments/${data}`);
        toast.promise(resp,{
            loading:"please wait while fetching your comment",
            success:"no of comment fetched sucessfully",
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


export {commentsonvideo,addcommentonvideo,getcommentbyid,updatecomment,noofcomments,deletecomment}
export default commentslice.reducer