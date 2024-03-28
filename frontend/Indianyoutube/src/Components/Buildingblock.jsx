import React from "react";
import { FaReact } from "react-icons/fa";
import { DiMongodb } from "react-icons/di";
import { SiExpress } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
export default function Buildingblock() {
    const navigate=useNavigate();
    return (
        <>
            <div className="bg-black min-h-screen">
                <h2 className="text-white text-center text-2xl">Welcome to Building block of Indianyoutube</h2>
                <div className="grid grid-cols-2 items-center justify-center mt-4">
                    <div className="flex items-center justify-center mt-4">
                        <FaReact size={100} color="blue" />
                        <h3 className="text-white text-xl ml-2">React</h3>
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <DiMongodb size={100} color="green" />
                        <h3 className="text-white text-xl ml-2">Mongodb</h3>
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <SiExpress size={100} color="white" />
                        <h3 className="text-white text-xl ml-2">Express</h3>
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <FaNodeJs size={100} color="red" />
                        <h3 className="text-white text-xl ml-2">Node JS</h3>
                    </div>
                </div>
                <div>
                    <button className="bg-blue-500 w-1/2 block mx-auto mt-4 text-white p-4 rounded-lg font-bold text-xl" onClick={()=>(navigate(-1))}>Return back </button>
                </div>
            </div>
        </>
    )
}