import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout.jsx'
import Errorpage from './error.jsx'
import { Provider } from 'react-redux'
import { store } from './Redux/store.js'
import Signup from './Components/Signup.jsx'
import Signin from './Components/Signin.jsx'
import Header from './Components/header.jsx'
import Mychannel from './Components/Mychannel.jsx'
import PlaylistDashboard from './Components/createplaylist.jsx'
import Playlistevaluate from './Components/Playlistevaluate.jsx'
import Home from './Components/Home.jsx'
import Videoplaysite from './Components/Videoplaysite.jsx'
import Aboutus from './Components/About.jsx'
import Addvideo from './Components/Addvideo.jsx'
import Updateplaylist from './Components/Updateplaylist.jsx'
import Updatevideo from './Components/Updatevideo.jsx'
import Videoplayingsite from './Components/Videoplayer.jsx'
import CommentSection from './Components/Comment.jsx'
import ChannelProfile from './Components/ChannelProfile.jsx'
import SubscriberSection from './Components/SubscriberSection.jsx'
import LikeSection from './Components/LikeSection.jsx'
import Buildingblock from './Components/Buildingblock.jsx'
const router=createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    errorElement:<Errorpage/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"Signup",
        element:<Signup/>
      },
      {
        path:"Signin",
        element:<Signin/>
      },
      {
        path:"Mychannel",
        element:<Mychannel/>
      },
      {
        path:"PlaylistDashboard",
        element:<PlaylistDashboard/>
      },
      {
        path:"Playlistevaluate",
        element:<Playlistevaluate/>
      },
      {
        path:"Videoplaysite",
        element:<Videoplaysite/>
      },
      {
        path:"Aboutus",
        element:<Aboutus/>
      },
      {
        path:"Addvideo",
        element:<Addvideo/>
      },
      {
        path:"Updateplaylist",
        element:<Updateplaylist/>
      },
      {
        path:"Updatevideo",
        element:<Updatevideo/>
      },
      {
        path:"videoplaysite",
        element:<Videoplayingsite/>
      },
      {
        path:"commentsection",
        element:<CommentSection/>
      },
      {
        path:"ChannelProfile",
        element:<ChannelProfile/>
      },
      {
        path:"SubscriberSection",
        element:<SubscriberSection/>
      },
      {
        path:"LikeSection",
        element:<LikeSection/>
      },
      {
        path:"Buildingblock",
        element:<Buildingblock/>
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
