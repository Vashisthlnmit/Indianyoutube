import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createplaylist } from "../Redux/playlist";
import toast,{Toaster} from "react-hot-toast";
export default function PlaylistDashboard() {
    const state=useSelector((state)=>(state.auth))
    const dispatch=useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    async function handleSubmit(e){
        e.preventDefault();
        // Here you can handle the submission of the form data
        console.log('Title:', title);
        console.log('Description:', description);
        if(!title){
            return toast.error("title is missing")
        }
        if(!description){
            return toast.error("description is missing")
        }
        const data={title:title,description:description}
        const respo=await dispatch(createplaylist(data))
        console.log(respo);
        // Reset form fields after submission
        setTitle('');
        setDescription('');
    }
    return (
        <>
            <div className=" h-screen" data-theme="forest">
                <div className="max-w-md mx-auto my-auto p-4 bg-white rounded shadow-md ">
                    <h1 className="text-2xl font-semibold mb-4">Create Playlist</h1>
                    <form onSubmit={handleSubmit} noValidate:true>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
                            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
                            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required></textarea>
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Create Playlist</button>
                    </form>
                </div>
                <Toaster/>
            </div>
            
        </>
    )


}