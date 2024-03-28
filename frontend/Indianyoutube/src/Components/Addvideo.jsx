import React, { useState } from "react"
import toast,{Toaster} from "react-hot-toast"
import {useDispatch} from "react-redux"
import { publishavideo } from "../Redux/videoreducer";
export default function Addvideo() {
    const [data, setdata] = useState({ title: "", Description: "", videothumbnail: "", videofile: "" });
    const [previewdata, setpreviewdata] = useState({ videothumbnailpreview: "", videofilepreview: "" });
    const dispatch=useDispatch();
    function videothumbnailpreview(e) {
        e.preventDefault();
        const filerequest = e.target.files[0];
        setdata({ ...data, videothumbnail: filerequest })
        const filereader = new FileReader();
        filereader.readAsDataURL(filerequest);
        filereader.addEventListener("load", function () {
            setpreviewdata({ ...previewdata, videothumbnailpreview: this.result })
        })
    }
    function videofilepreview(e) {
        e.preventDefault();
        const filerequest = e.target.files[0];
        setdata({ ...data, videofile: filerequest })
        const filereader = new FileReader();
        filereader.readAsDataURL(filerequest);
        filereader.addEventListener("load", function () {
            setpreviewdata({ ...previewdata, videofilepreview: this.result })
        })
    }
    async function handleSubmit(e){
        e.preventDefault();
        if(!data.title){
            return toast.error("videotitle is missing");
        }
        if(!data.Description){
            return toast.error("videodescription is missing");
        }
        if(!data.videofile){
            return toast.error("videofile is missing");
        }
        if(!data.videothumbnail){
            return toast.error("videothumbnail is missing");
        }
        const response=await dispatch(publishavideo(data));
        console.log(response);
        setdata({title:"",Description:"",videothumbnail:"",videofile:""});
        setpreviewdata({videofilepreview:"",videothumbnailpreview:""});
    }
    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Add Video</h1>
                <form onSubmit={handleSubmit} noValidate:true>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={data.title}
                            onChange={(e) => setdata({...data,title:e.target.value})}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            value={data.Description}
                            onChange={(e) =>  setdata({...data,Description:e.target.value})}
                            rows="3"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="videoFile" className="block text-sm font-medium text-gray-700">Video File</label>
                        <input
                            type="file"
                            id="videoFile"
                            accept="video/*"
                            onChange={videofilepreview}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="videoThumbnail" className="block text-sm font-medium text-gray-700">Video Thumbnail</label>
                        <input
                            type="file"
                            id="videoThumbnail"
                            accept="image/*"
                            onChange={videothumbnailpreview}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        {previewdata.videothumbnailpreview && (
                            <img
                                src={previewdata.videothumbnailpreview}
                                alt="Video Thumbnail"
                                className="max-w-xs mb-2"
                            />
                        )}
                        {previewdata.videofilepreview && (
                            <video
                                controls
                                className="max-w-xs"
                                src={previewdata.videofilepreview}
                            >
                            </video>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <Toaster/>
        </>
    )
}