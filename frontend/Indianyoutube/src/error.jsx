import React from "react";
import { useNavigate } from "react-router-dom"
export default function Errorpage(){
    const navigate=useNavigate();
    return(
        <>
         <div className="w-full h-screen flex items-center justify-center" data-theme="forest">
           <div className="w-full">
             <p className="text-center  sm:text-xl md:text-6xl lg:text-5xl font-bold text-gray-300 tracking-wider ">404</p>
             <p className="text-center sm:text-xl md:text-6xl lg:text-5xl font-bold tracking-wider text-gray-500">Page not Found</p>
             <p className="text-center sm:text-xl md:text-2xl lg:text-2xl font-bold tracking-wider text-gray-500">Sorry the page you are looking for could not found </p>
             <button className="w-1/5 mt-4 mx-auto p-1 lg:text-xl rounded-md text-white font-bold tracking-wider block lg:p-4 bg-blue-400" onClick={()=>(navigate(-1))}>
                Return
             </button>
           </div>
         </div>
        </>
    )
}