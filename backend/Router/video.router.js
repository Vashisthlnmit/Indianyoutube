import { Router } from "express";
import { getallvideo, getvideobyid, publishavideo, updatevideo ,getvideobyuser,deletevideo} from "../Controllers/video.controller.js";
import { upload } from "../Middleware/multer.middleware.js";
import { isloggedin } from "../Middleware/auth.middleware.js";
const videorouter=Router();
videorouter.route('/').get(getallvideo)
videorouter.route('/:videoid').get(getvideobyid).delete(isloggedin,deletevideo)
.patch(isloggedin,upload.single("videothumbnail"),updatevideo)
videorouter.route('/createvideo').post(isloggedin,upload.fields([
    {
        name:"videothumbnail",
        maxCount:1
    },
    {
        name:"videofile",
        maxCount:1
    }
]),publishavideo)
videorouter.route("/user/:userid").get(getvideobyuser)
export {videorouter}