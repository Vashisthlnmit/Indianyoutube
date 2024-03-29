import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast"
const intialstate = {
    isitinto: localStorage.getItem("isitinto") || false,
    info: JSON.parse(localStorage.getItem("info")) || {}
}
const authreducer = createSlice({
    name: "auth",
    initialState: intialstate,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(signin.fulfilled, (state, action) => {
            localStorage.setItem("isitinto",action?.payload?.data?.success)
            localStorage.setItem("info",JSON.stringify(action?.payload?.data?.data))
            state.isitinto = action?.payload?.data?.success
            state.info = action?.payload?.data?.data
        }),
            builder.addCase(logout.fulfilled, (state, action) => {
                localStorage.clear();
                state.isitinto = false,
                    state.info = []
            })
    }
})
const signup = createAsyncThunk('/signup', async (data) => {
    try {
        const response = axios.post('/api/signup', data);
        toast.promise(response, {
            loading: "please wait for moment account creation is in progess",
            success: (data)=>{
                return "you have successfully signed up"
            },
            error:(err)=>{
                return err?.response?.data
            }
        })
        const res = await response;
        return res;

    }
    catch (error) {
        toast.error(error)
        console.log(error);
    }
})
const signin = createAsyncThunk('/signin', async (data) => {
    try {
        const response = axios.post('/api/signin', data);
        toast.promise(response, {
            loading: "please wait for a moment user is begining signed in",
            success: "user is successfully logined",
            error:(err)=>{
                return err?.response?.data
            }
        })
        return await response
    }
    catch (error) {
        console.log(error);
        toast.error(error)
    }
})
const logout = createAsyncThunk('/logout', async () => {
    try {
        const response = axios.post('/api/logout')
        toast.promise(response, {
            loading: "please wait user is begining logging out",
            success: (data)=>{
                return "you have successfully logout"
            },
            error:(err)=>{
                return err?.response?.data
            }
        })
         return await response;
    }
    catch (error) {
        console.log(error);
        toast.error(error)
    }
})
const userdetails = createAsyncThunk('/userdata', async () => {
    try{
        const response=axios.get('/api/userdetails')
        toast.promise(response,{
            loading:"there please fetching user details",
            success:"user details fetched successfully",
            error:(err)=>{
                return err?.response?.data
            }
        })
        return await response
    }
    catch(error){
        console.log(error);
        toast.error(error)
    }
})
const updateavatar=createAsyncThunk('/useravatar', async (data) => {
    try{
        const response=axios.patch('/api/updateavatar',data)
        toast.promise(response,{
            loading:" please wait while updating avatar",
            success:"avatar updated successfuly",
            error:(err)=>{
                return err?.response?.data
            }
        })
        return await response
    }
    catch(error){
        console.log(error);
        toast.error(error)
    }
})
const updatename=createAsyncThunk('/username', async (data) => {
    try{
        const response=axios.patch('/api/updateusername',data)
        toast.promise(response,{
            loading:" please wait while updating details",
            success:"details updated successfuly",
            error:(err)=>{
                return err?.response?.data
            }
        })
        return await response
    }
    catch(error){
        console.log(error);
        toast.error(error)
    }
})
const getchannelprofile=createAsyncThunk('/channelprofile',async(data)=>{
    try{
        const respo=axios.get(`/api/getchannelprofile/${data}`);
        toast.promise(respo,{
            loading:"please fetching user channel details",
            success:"user channel details fetched successfully",
            error:(err)=>{
                return err?.response?.data
            }
        })
        return await respo;
    }
    catch(error){
        toast.error(error);
    }
})
export { signup, signin, logout ,userdetails,updateavatar,updatename,getchannelprofile}
export default authreducer.reducer