import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallvideo } from "../Redux/videoreducer";
import { useNavigate } from "react-router-dom";
export default function Home() {
    const dispatch = useDispatch();
    const navigate=useNavigate();
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
        <div className="ml-72 flex">
            <h2>Welcome to ECE DEPARTMENT</h2>
            {video?.map((value) => (
                <div
                    className="relative cursor-pointer"
                    onMouseEnter={() => setShowButton(true)}
                    onMouseLeave={() => setShowButton(false)}
                >
                    <img src={value?.videothumbnail} alt={value?.title} className="w-20 h-20" />
                    {showButton && (
                        <button
                            className=" bottom-2 right-2 bg-white text-black px-2 py-1 rounded-md shadow"
                            onClick={()=>(navigate("/Videoplaysite",{state:value}))}
                        >
                            Watch Now
                        </button>
                    )}
                    <p className="mt-2 text-sm">{value?.title}</p>
                </div>
                
            ))}
            </div>
        </>
    )
}