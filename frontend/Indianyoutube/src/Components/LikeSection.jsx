import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { nolikes, tooglelike, checklike } from "../Redux/likes";
import { Toaster } from "react-hot-toast"
export default function LikeSection({ videodetail }) {
  const dispatch = useDispatch();
  console.log(videodetail);
  const [nolike, setnolikes] = useState(0);
  const [subscri, setsubsci] = useState(false);
  async function like() {
    const response = await dispatch(nolikes(videodetail?._id));
    setnolikes(response?.payload?.data?.message[0]?.likes)
    console.log(response);
  }
  async function likecheck() {
    const response = await dispatch(checklike(videodetail?._id));
    setsubsci(response?.payload?.data?.success)

  }
  async function likeunlike() {
    const response = await dispatch(tooglelike(videodetail?._id));
    console.log(response);
    setsubsci(response?.payload?.data?.success)
  }
  useEffect(() => {
    like()
    likecheck()
  }, [])
  useEffect(()=>{
    like()
  },[subscri])
  return (
    <>
      <div className="flex items-center  bg-black ">
        <button className="bg-red-500 p-4 rounded-lg text-white mt-4 ml-4 " onClick={likeunlike}>like</button>
        <span className="text-xl text-white">{nolike} Likes</span>
      </div>
      <Toaster />
    </>
  )
}