import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux"
import { updatevideo } from '../Redux/videoreducer';
export default function Updatevideo() {
    const location=useLocation();
    const dispatch=useDispatch();
    const [data, setdata] = useState({ title: "", Description: "", videothumbnail: "" });
    const [imageprev, setimageprev] = useState("")
    const handleImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setdata({ ...data, videothumbnail: file });
        const filereader = new FileReader();
        filereader.readAsDataURL(file);
        filereader.addEventListener('load', function() {
            setimageprev(this.result);
        })
    };
    async function handleSubmit(e){
        e.preventDefault();
        const form={videoid:location.state,title:data.title,Description:data.Description,videothumbnail:data.videothumbnail}
        const resp=await dispatch(updatevideo(form));
        setdata({title:"",Description:"",videothumbnail:""});
        setimageprev("");
    };
    return (
        <div className=" min-h-screen flex items-center justify-center" data-theme="forest">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-white mb-4">Update Video Details</h2>
                <form onSubmit={handleSubmit}>
                    {/* Image Preview */}
                    {imageprev && (
                        <div className="mb-4">
                            <img src={imageprev} alt="Preview" className="w-full rounded-lg mb-2" />
                        </div>
                    )}

                    {/* Image Input */}
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-white">Video Image</label>
                        <input
                            type="file"
                            id="image"
                            onChange={handleImageChange}
                            accept="image/*"
                            className="file-input file-input-bordered file-input-accent w-full max-w-xs"
                            required
                        />
                    </div>

                    {/* Title Input */}
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-white">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={data.title}
                            onChange={(e) => setdata({ ...data, title: e.target.value })}
                            className="w-full bg-gray-700 text-white rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter title"
                            required
                        />
                    </div>

                    {/* Description Input */}
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-white">Description</label>
                        <textarea
                            id="description"
                            value={data.Description}
                            onChange={(e) => setdata({ ...data, Description: e.target.value })}
                            className="w-full bg-gray-700 text-white rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter description"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};



