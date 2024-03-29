import React, { useEffect, useState } from "react";
import { nofsubscriber,checksubscriber,togglesubscription } from "../Redux/subscription";
import { useSelector, useDispatch } from "react-redux"
import {Toaster} from "react-hot-toast"
export default function SubscriberSection({ videodetail }) {
    const state1 = useSelector((state) => (state.auth))
    console.log(state1);
    console.log(videodetail);
    const dispatch = useDispatch();
    const [userSubscriptionStatus, setUserSubscriptionStatus] = useState(true);
    const [nosub,setnosub]=useState(0);
    const [data, setdata] = useState({ subscriberid: state1?.info?._id, channelid: videodetail?.owner });
    async function check() {
        const response = await dispatch(checksubscriber(data));
        console.log(response?.payload?.data?.success);
    }
    async function subscribe() {
        // const detail = { subscriberid: state1?._id, channelid: videodetail?.owner };
        const response = await dispatch(togglesubscription(data));
        setUserSubscriptionStatus(response?.payload?.data?.success)
    }
    async function countsubscriber(){
        const response=await dispatch(nofsubscriber(videodetail?.owner));
        setnosub(response?.payload?.data?.message[0]?.totalsubscriber)
    }
    useEffect(()=>{
        check();
        countsubscriber();
    },[])
    return (
        <>
            {/* <div className="flex items-center justify-center h-screen bg-black">
                <button
                    className={`px-6 py-2 rounded-full font-semibold text-white ${userSubscriptionStatus ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                    // onClick={handleSubscription}
                >
                    {userSubscriptionStatus ? 'Subscribed' : 'Subscribe'}
                </button>
            </div> */}
            <div className="bg-black">
            <h4 className="text-white">No of subscriber:{nosub}</h4>
            {userSubscriptionStatus?<button className="bg-green-500 rounded-lg p-4" onClick={subscribe}>Unsubscribe</button>:<button  className="bg-red-500 rounded-lg p-4" onClick={subscribe}>Subscribe</button>}
            </div>
        </>
    )
}