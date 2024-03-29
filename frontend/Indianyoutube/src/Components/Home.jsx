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
            <div className="h-screen bg-black">
                <h2 className="text-center  text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500">Welcome to IndianYoutube</h2>
                <div className="ml-72 flex mt-4  flex-wrap">
                    {video?.map((value) => (
                        <div
                            className="relative cursor-pointer ml-2"
                            onMouseEnter={() => setShowButton(true)}
                            onMouseLeave={() => setShowButton(false)}
                        >
                            <img src={value?.videothumbnail} alt={value?.title} className="w-40 h-40 rounded-md" />
                            {showButton && (
                                <button
                                    className=" bottom-2 right-2 mt-2 bg-white text-black px-2 py-1 rounded-md shadow"
                                    onClick={() => (navigate("/Videoplaysite", { state: value }))}
                                >
                                    Watch Now
                                </button>
                            )}
                            <p className="mt-2 text-sm text-center text-white">{value?.title}</p>
                        </div>

                    ))}
                </div>
            </div>
        </>
    )
}