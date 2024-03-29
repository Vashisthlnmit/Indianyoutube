import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallvideo } from "../Redux/videoreducer";
import { IoHomeSharp } from "react-icons/io5";
import { MdSubscriptions } from "react-icons/md";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { SiMediamarkt } from "react-icons/si";
import { IoReorderThreeOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { FaPerson } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { logout } from "../Redux/authentication";
export default function Header() {
     const dispatch=useDispatch();
    // const state=useSelector((state)=>(state.videoconven))
    // console.log(state);
    // async function hope(){
    //     await dispatch(getallvideo())
    // }
    // useEffect(()=>{
    //     const h=hope();
    //     console.log(h);
    // },[])
    function changewidth(){
        const drawer=document.getElementsByClassName("drawer-side");
        drawer[0].style.width='auto';

    }
    function close(){
        const drawerside=document.getElementsByClassName("drawer-side");
        const overdrawer=document.getElementsByClassName("drawer-toggle");
        drawerside[0].style.width=0;
        overdrawer[0].checked=false;
    } 
    async function gettinglogout(){
        const preparinglogoutdepartion=await dispatch(logout());
        console.log(preparinglogoutdepartion);
    }
    const state1=useSelector((state)=>(state.auth))
    return (
        <>
            
            <div className="drawer bg-black" >
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer">
                        <IoHomeOutline onClick={changewidth} className="w-10 h-10"/>
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                    </label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                         <IoIosCloseCircle className="w-10 h-10" onClick={close}/>
                         <Link to="Signin">Signin</Link>
                        <Link to="Signup">Sign up</Link> 
                        <Link to="Aboutus">About us</Link>
                        <Link to="Buildingblock">Buildingblock</Link>
                        <Link to="/">Home</Link>
                        {state1.isitinto && <button className="bg-red-500" onClick={gettinglogout}>Logout</button>}
                        {state1.isitinto && <Link to="Mychannel">Mychannel</Link>}
                    </ul>
                </div>
            </div>
        </>
    )
}