import { isloggedin } from "../Middleware/auth.middleware.js";
import {Router} from "express"
import { addcomment, getvideocomment,updatecomment,deletecomment,getvideocommentbyid,commentscount} from "../Controllers/comments.controller.js";
export const commentrouter=Router()
commentrouter.route('/commentcreateget/:videoid').post(isloggedin,addcomment).get(getvideocomment)
commentrouter.route('/updationofcomments/:commentid').patch(isloggedin,updatecomment)
commentrouter.route('/deletationofcomments/:commentid').delete(isloggedin,deletecomment)
commentrouter.route('/commentbyuser/:videoid/:userid').get(isloggedin,getvideocommentbyid)
commentrouter.route('/countingcomments/:videoid').get(commentscount)