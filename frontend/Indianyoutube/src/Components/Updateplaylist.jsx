import React, { useState } from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import { updateplaylist } from '../Redux/playlist';
import {useDispatch} from "react-redux";
export default function Updateplaylist(){
  const [data,setdata]=useState({playlistid:"",title:"",description:""});
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const location=useLocation();
  async function handleSubmit(e){
    e.preventDefault();
    setdata({...data,playlistid:location.state});
    const response=await dispatch(updateplaylist(data));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center" data-theme="forest">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">Update Title and Description</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-white">Title</label>
            <input
              type="text"
              id="title"
              value={data.title}
              onChange={(e)=>(setdata({...data,title:e.target.value}))}
              className="w-full bg-gray-700 text-white rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-white">Description</label>
            <textarea
              id="description"
              value={data.description}
              onChange={(e)=>(setdata({...data,description:e.target.value}))}
              className="w-full bg-gray-700 text-white rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter description"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
          >
            Update
          </button>
        </form>
      </div>
      <div className="mt-8">
        <img
          src="https://via.placeholder.com/400"
          alt="Interactive Image"
          className="w-64 h-auto rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition duration-300"
        />
      </div>
    </div>
  );
};
