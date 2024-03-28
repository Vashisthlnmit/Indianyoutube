import { tooglevideolike,noflikes,checklike } from "../Controllers/like.controller.js";
import {Router} from "express"
import { isloggedin } from "../Middleware/auth.middleware.js";
export const likerouter=Router();
likerouter.route("/:videoid").post(isloggedin,tooglevideolike).get(noflikes)
likerouter.route('/check/:videoid').get(isloggedin,checklike)