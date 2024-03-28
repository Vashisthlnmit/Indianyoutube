import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { getvideobyuserid } from "../Redux/videoreducer";
import { addvideotoplaylist } from "../Redux/playlist";
import toast,{Toaster} from "react-hot-toast"
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
    async function addvideo(id){
        const data={playlistid:location.state,videoid:id}
        const response=await dispatch(addvideotoplaylist(data));
    }
    useEffect(() => {
        videofetching();
    }, [])
    return (
        <>
            <h2>Welcome to page of crud operation on playlist</h2>
            {
                video?.map((play) => (
                    <div className=" mt-10 hover:cursor-pointer" onClick={()=>(addvideo(play?._id))}>
                        <img src={play?.videothumbnail} alt="" className="w-40 h-40"/>
                        <h1 >{play?.title}</h1>
                        <h3>{play?.Description}</h3>
                    </div>
                ))
            }
        </>
    )
}
