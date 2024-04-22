import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getchannelprofile } from "../Redux/authentication";
import { useLocation } from "react-router-dom"
import { getvideobyuserid } from "../Redux/videoreducer";
export default function ChannelProfile() {
    const location = useLocation();
    console.log(location);
    const dispatch = useDispatch();
    const [data, setdata] = useState({ name: "", avatar: "", channelsubsribetoo: "", subscribeto: [], subscribercount: "" });
    const [video, setvideo] = useState([]);
    async function userchannelprofile() {
        console.log(location.state.owner);
        const fulfilledrequest = await dispatch(getchannelprofile(location.state.owner))
        console.log(fulfilledrequest);
        setdata({
            name: fulfilledrequest?.payload?.data?.data[0].username
            , avatar: fulfilledrequest?.payload?.data?.data[0].avatar,
            channelsubsribetoo: fulfilledrequest?.payload?.data?.data[0].channelsubscribetoo,
            subscribeto: fulfilledrequest?.payload?.data?.data[0].subscribedto,
            subscribercount: fulfilledrequest?.payload?.data?.data[0].subscriberCount,
        })

    }
    async function getvideos() {
        const resp = await dispatch(getvideobyuserid(location.state.owner));
        console.log(resp);
        setvideo(resp?.payload?.data?.data);
    }
    useEffect(() => {
        userchannelprofile();
        getvideos()
    }, [])
    return (
        <>
            <div className=" text-white py-12 px-4 sm:px-6 lg:px-8 min-h-screen" data-theme="forest">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            {/* <img
                                className="h-16 w-16 rounded-full object-cover mr-4"
                                src={data?.avatar}
                                alt={`${data?.name} Avatar`}
                            /> */}
                            <div className="avatar">
                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={data?.avatar} alt={`${data?.name} Avatar`}/>
                                </div>
                            </div>
                            <div className="ml-4">
                                <h1 className="text-3xl font-bold">{data?.name}</h1>
                                <p className="text-sm">Subscribers: {data?.subscribercount}</p>
                                <p className="text-sm">Subscribedtoo: {data?.channelsubsribetoo}</p>
                            </div>
                        </div>
                        <div>
                            {/* Any additional actions/buttons can go here */}
                        </div>
                    </div>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {video?.map(video => (
                            // <div key={video.id} className="bg-white p-6 rounded-lg shadow-md">
                            //     <img
                            //         className="w-full h-40 object-cover mb-4 rounded-lg"
                            //         src={video?.videothumbnail}
                            //         alt={video?.title}
                            //     />
                            //     <h2 className="text-lg font-semibold">{video?.title}</h2>
                            // </div>
                            <div key={video.id} className="card w-96 bg-base-100 shadow-xl">
                                <figure><img src={video?.videothumbnail} alt={video?.title} /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {video?.title}
                                    </h2>
                                    <p>{video?.Description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}