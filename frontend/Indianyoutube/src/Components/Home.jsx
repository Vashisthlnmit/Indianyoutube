import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallvideo } from "../Redux/videoreducer";
import { useNavigate } from "react-router-dom";
export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [video, setvideo] = useState([]);
    const [showButton, setShowButton] = useState(false);
    const state = useSelector((state) => (state.videoconven))
    async function hope() {
        const videoplaylist = await dispatch(getallvideo());
        setvideo(videoplaylist?.payload?.data?.data)
    }
    useEffect(() => {
        hope();
    }, [])
    return (
        <>
            <div className="min-h-screen" data-theme="forest">
                <h2 className="text-center  text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500">Welcome to IndianYoutube</h2>
                <div className="ml-72 flex mt-4  flex-wrap">
                    {video?.map((value) => (
                        <div
                            className="relative cursor-pointer ml-2 flex flex-col"
                            onMouseEnter={() => setShowButton(true)}
                            onMouseLeave={() => setShowButton(false)}
                        >
                            <div className="flex flex-col justify-evenly h-80 w-80 mt-2">
                                <img src={value?.videothumbnail} alt={value?.title} className="w-80 h-80 rounded-md mx-auto" />
                                {showButton && (
                                    <button
                                        className="btn btn-neutral mt-2"
                                        onClick={() => (navigate("/Videoplaysite", { state: value }))}
                                    >
                                        Watch Now
                                    </button>
                                )}
                                <h3 className="mt-2 text-sm text-center text-white overflow-hidden">{value?.title}</h3>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </>
    )
}