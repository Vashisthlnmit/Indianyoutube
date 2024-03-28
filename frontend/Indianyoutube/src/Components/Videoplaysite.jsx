import React, { useEffect, useState } from "react";
import { getvideobyid } from "../Redux/videoreducer";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { commentsonvideo, addcommentonvideo, getcommentbyid, noofcomments , deletecomment,updatecomment} from "../Redux/comment";
import { tooglelike, nolikes } from "../Redux/likes";
import { nofsubscriber } from "../Redux/subscription";
import { getchannelprofile } from "../Redux/authentication";
import toast, { Toaster } from "react-hot-toast"
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import Videoplayingsite from "./Videoplayer";
import CommentSection from "./Comment";
import SubscriberSection from "./SubscriberSection";
import LikeSection from "./LikeSection";
export default function Videoplaysite() {

    const state = useSelector((state) => (state.auth))
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [textareaview, settextbox] = useState(false);
    const [contdata,setcontdata]=useState("")
    const handleMouseEnter = (index) => {
        setHoveredIndex(index)
    }
    const handleMouseleave = () => {
        setHoveredIndex(null);
        settextbox(false);
    }
    const [video, setvideo] = useState([]);
    const [usercom, setcommentbyuser] = useState([]);
    const [comment, setcomment] = useState([]);
    const [likes, setlikes] = useState(0);
    const [nocomment, setnocomment] = useState(0);
    const [liked, setliked] = useState(false)
    const [commenttext, setcommenttext] = useState("")
    const [subscriber, setnofsubscriber] = useState(0);
    const location = useLocation();
    const dispatch = useDispatch();
    //comment function area
    //video details function area
    async function getvideodetail() {
        const videodetails = await dispatch(getvideobyid(location.state._id));
        setvideo(videodetails?.payload?.data?.data);
    }
    // like function area
    async function totallikes() {
        const nooflikes = await dispatch(nolikes(location.state._id));
        setlikes(nooflikes?.payload?.data?.message[0]?.likes)
    }
    async function likecheck() {
        const check = await dispatch(tooglelike(location.state));
        console.log(check);
    }
    // subscriber total count
    async function totalsubscriber() {
        const resp = await dispatch(nofsubscriber(location.state.owner));
        setnofsubscriber(resp?.payload?.data?.message[0]?.totalsubscriber)
    }
    return (
        <>
           <Videoplayingsite videodetail={location.state}/>
           <LikeSection videodetail={location.state}/>
           <SubscriberSection videodetail={location.state}/>
           <CommentSection videodetail={location.state}/>
           <Toaster/>
        </>
    )
}