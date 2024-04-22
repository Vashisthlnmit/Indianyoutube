import React, { useEffect, useState } from "react";
import { getchannelprofile } from "../Redux/authentication";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RxUpdate } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import { getplaylistbyuser } from "../Redux/playlist";
import { deleteplaylist } from "../Redux/playlist";
import { getvideobyuserid } from "../Redux/videoreducer";
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import { deletevideo } from "../Redux/videoreducer";
export default function Mychannel() {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };
    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };
    const state1 = useSelector((state) => (state.auth))
    const navigate = useNavigate();
    const [data, setdata] = useState({ name: "", avatar: "", channelsubsribetoo: "", subscribeto: [], subscribercount: "" })
    const [playlist, setplaylist] = useState([]);
    const [video, setvideo] = useState([]);
    const dispatch = useDispatch();
    async function userchannelprofile() {
        console.log(state1.info._id);
        const fulfilledrequest = await dispatch(getchannelprofile(state1.info._id))
        setdata({
            name: fulfilledrequest?.payload?.data?.data[0].username
            , avatar: fulfilledrequest?.payload?.data?.data[0].avatar,
            channelsubsribetoo: fulfilledrequest?.payload?.data?.data[0].channelsubscribetoo,
            subscribeto: fulfilledrequest?.payload?.data?.data[0].subscribedto,
            subscribercount: fulfilledrequest?.payload?.data?.data[0].subscriberCount,
        })
    }
    async function getallplaylist() {
        const allplaylist = await dispatch(getplaylistbyuser(state1?.info?._id));
        console.log(allplaylist?.payload?.data?.data[0].playlist);
        setplaylist(allplaylist?.payload?.data?.data[0].playlist);
        console.log(setplaylist);
    }
    async function delplaylist(e) {
        const resp = await dispatch(deleteplaylist(e));
        console.log(resp);
    }
    async function getvideos() {
        const resp = await dispatch(getvideobyuserid(state1.info._id));
        console.log(resp);
        setvideo(resp?.payload?.data?.data);
    }
    async function deletevid(e) {
        const resp = await dispatch(deletevideo(e));
        console.log(resp);
    }
    useEffect(() => {
        userchannelprofile()
        getallplaylist()
        getvideos()
    }, [])
    return (
        <>
            <div className=" min-h-screen" data-theme="forest">
                <div className=" min-h-screen py-8">
                    {/* Profile Header */}
                    <div className=" shadow-md rounded-lg overflow-hidden">
                        <div className="bg-cover bg-center h-64" style={{ backgroundImage: `url(${data?.avatar})` }}></div>
                        <div className="p-6">
                            <h2 className="text-2xl text-white font-bold mb-2">{data?.name}</h2>
                            <p className="text-red-600 font-bold"><span className="text-white">subscriber</span> : {data?.subscribercount}</p>
                            <p className="text-red-600 font-bold"><span className="text-white">ChannelSubscribetoo : </span>{data?.channelsubsribetoo}</p>
                            <Link to="/PlaylistDashboard" className="text-white bg-red-500 p-2 mt-4 block text-center text-2xl rounded-full">Create your playlist</Link>
                            <Link to="/Addvideo" className="text-white bg-red-500 p-2 mt-4 block text-center text-2xl rounded-full">Publish a video</Link>

                        </div>

                    </div>
                    {/*Playlist display and crud  Section */}
                    {/* <div className=" mt-8 shadow-md rounded-lg overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4 text-white">Your Playlist</h3>
                            {
                                playlist?.map((play) => (
                                    <div className="text-white bg-green-500 mt-10 hover:cursor-pointer" >
                                        <h1 >{play?.title}</h1>
                                        <button onClick={() => (delplaylist(play?._id))}><MdDelete className="w-20 h-20" /></button>
                                        <button onClick={() => (navigate("/Updateplaylist", { state: play?._id }))}><RxUpdate className="w-20 h-20" /></button>
                                        <button onClick={() => (navigate("/Playlistevaluate", { state: play?._id }))}><IoAddCircleSharp className="w-20 h-20" /></button>
                                    </div>
                                ))
                            }
                        </div>
                    </div> */}
                    <div className="collapse bg-base-200">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium">
                            Click to see your playlist
                        </div>
                        <div className="collapse-content">
                            {
                                playlist?.map((play) => (
                                    <div className="text-white  rounded-lg hover:cursor-pointer" >
                                        <div className="flex flex-wrap justify-between">
                                        <h1 >{play?.title}</h1>
                                        <button onClick={() => (delplaylist(play?._id))} title="Delete playlist"><MdDelete /></button>
                                         <button onClick={() => (navigate("/Updateplaylist", { state: play?._id }))} title="Update playlist"><RxUpdate/></button>
                                        <button onClick={() => (navigate("/Playlistevaluate", { state: play?._id }))} title="modify playlist"><IoAddCircleSharp/></button> 
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {/* video display and crud section*/}
                    <div className="grid grid-cols-3 gap-4" >
                        {video?.map((uservideo, index) => (
                            <div
                                key={index}
                                className="relative"
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {/* Video Image */}
                                {/* <img src={uservideo?.videothumbnail} alt="Video Thumbnail" className="w-full rounded-lg shadow-lg" /> */}
                                <div className="card w-96 bg-base-100 shadow-xl">
                                    <figure><img src={uservideo?.videothumbnail} alt="Video" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            {uservideo?.title}
                                        </h2>
                                        <p>{uservideo?.Description}</p>
                                    </div>
                                </div>
                                {/* Options Overlay */}
                                {hoveredIndex === index && (
                                    <div className="absolute top-0 right-0 mt-2 mr-2 flex space-x-2">
                                        <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md flex items-center justify-center" onClick={() => (deletevid(uservideo?._id))}>
                                            <FaTrash />
                                        </button>
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md flex items-center justify-center" onClick={() => (navigate("/Updatevideo", { state: uservideo?._id }))}>
                                            <FaPencilAlt />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}