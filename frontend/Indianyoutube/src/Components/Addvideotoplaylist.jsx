import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux"
export default function Addvideotoplaylist(){
    const state=useSelector((state)=>(state.auth));
    const [video,setvideo]=useState([]);
    
    return(
        <>
         <h3>Hello welcome to addition page</h3>
        </>
    )
}