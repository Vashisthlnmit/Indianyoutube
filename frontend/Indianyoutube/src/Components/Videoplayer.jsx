import React from "react";
import { useState, useEffect } from "react";
import { getvideobyid } from "../Redux/videoreducer";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
export default function Videoplayingsite({ videodetail }) {
    const state = useSelector((state) => (state.auth));
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const [video, setvideo] = useState([]);
    async function getvideodetail() {
        const videodetails = await dispatch(getvideobyid(videodetail?._id));
        setvideo(videodetails?.payload?.data?.data);
    }
    useEffect(() => {
        getvideodetail();
    }, [])
    return (
        <>
            <div className=" flex flex-col  text-white" data-theme="forest">
                <video className="mt-2 block mx-auto" controls width="640" height="360" src={video?.videofile} controlsList="nodownload" autoPlay>
                </video>
                <div className="">
                    <h2 className="text-2xl font-bold">{video?.title}</h2>
                    <p className="mt-2">{video?.Description}</p>
                    <button className="flex items-center bg-gray-800 text-white py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500" onClick={()=>(navigate("/ChannelProfile",{state:videodetail}))}>
                        <img
                            className="h-8 w-8 rounded-full object-cover mr-2"
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                            alt="User"
                        />
                        <span className="text-white">click to view user profile</span>
                    </button>
                </div>
            </div>
        </>
    )
}