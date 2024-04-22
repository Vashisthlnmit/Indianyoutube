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
  useEffect(() => {
    like()
  }, [subscri])
  return (
    <>
      <div className="flex items-center " data-theme="forest">
        <button className="btn" onClick={likeunlike}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          like</button>
        <span className="text-xl text-white">{nolike} Likes</span>
      </div>
      <Toaster />
    </>
  )
}