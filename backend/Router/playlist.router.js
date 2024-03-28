import { playlist } from "../Models/playlist.model.js";
import {Router} from "express"
import { isloggedin } from "../Middleware/auth.middleware.js";
import { addvideotoplaylist, createplaylist, deleteplaylist, getplaylistbyid, getplaylistcreatedbyuser, updateplaylist } from "../Controllers/playlist.controller.js";
import { upload } from "../Middleware/multer.middleware.js";
const playlistrouter=Router()
playlistrouter.route('/create').post(isloggedin,createplaylist)
playlistrouter.route('/:playlistid').get(getplaylistbyid)
playlistrouter.route('/use/:userid').get(getplaylistcreatedbyuser)
playlistrouter.route('/crud/:playlistid').patch(isloggedin,updateplaylist).delete(isloggedin,deleteplaylist)
playlistrouter.route('/addvideo/:playlistid/:videoid').post(isloggedin,addvideotoplaylist)

export {playlistrouter}