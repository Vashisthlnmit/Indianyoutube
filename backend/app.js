import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
export const app=express();
app.use(cors({
    origin:process.env.ORIGIN,
    credentials:true
}))
app.use(express.json())
app.use(express.static('Public'))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
//Router
import { router } from "./Router/user.router.js";
import { videorouter } from "./Router/video.router.js";
import { playlistrouter } from "./Router/playlist.router.js";
import { commentrouter } from "./Router/comments.router.js";
import {likerouter} from "./Router/like.router.js"
import { subsrouter } from "./Router/subscription.router.js";
app.use('/api',router)
app.use('/api/video',videorouter)
app.use('/api/playlist',playlistrouter)
app.use('/api/comments',commentrouter)
app.use('/api/like',likerouter)
app.use('/api/sub',subsrouter);