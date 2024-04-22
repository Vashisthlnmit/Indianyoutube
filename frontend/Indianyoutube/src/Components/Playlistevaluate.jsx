import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { getvideobyuserid } from "../Redux/videoreducer";
import { addvideotoplaylist } from "../Redux/playlist";
import toast, { Toaster } from "react-hot-toast"
export default function Playlistevaluate() {
    const location = useLocation();
    console.log(location);
    const [video, setvideo] = useState([]);
    const state1 = useSelector((state) => (state.auth));
    const dispatch = useDispatch();
    async function videofetching() {
        const respo = await dispatch(getvideobyuserid(state1?.info?._id));
        setvideo(respo?.payload?.data?.data);
        console.log(respo?.payload?.data?.data);
    }
    async function addvideo(id) {
        const data = { playlistid: location.state, videoid: id }
        const response = await dispatch(addvideotoplaylist(data));
    }
    useEffect(() => {
        videofetching();
    }, [])
    return (
        <>
            <div className=" min-h-screen" data-theme="forest">
                <h2 className="text-center font-bold text-2xl">Add Video to Playlist: Expand Your Collection with Ease</h2>
                <p className="text-center mt-4">Welcome to Video addition page.Explore our curated playlist of captivating videos handpicked just for you. Sit back, relax, and enjoy a diverse range of content that promises to entertain, inform, and inspire.</p>
                {
                    video?.map((play) => (
                        <div className="card card-compact w-96 mt-4 bg-base-100 shadow-xl hover:cursor-pointer" onClick={()=>(addvideo(play?._id))}>
                            <figure><img src={play?.videothumbnail} alt="Video thumbnail" /></figure>
                            <div className="card-body">
                                <h2 className="card-title ">{play?.title}</h2>
                                <p>{play?.Description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
