import { Router} from "express";
import { getchannelprofile, getuserprofile, logout, signin, signup, updateavatarprofile, updateuserdetails } from "../Controllers/user.controller.js";
import { upload } from "../Middleware/multer.middleware.js";
import { isloggedin } from "../Middleware/auth.middleware.js";
const router=Router()
router.route('/signup').post(upload.single("avatar"),signup)
router.route('/signin').post(signin)
router.route('/logout').post(isloggedin,logout)
router.route('/userdetails').get(isloggedin,getuserprofile)
router.route('/updateavatar').patch(isloggedin,upload.single("avatar"),updateavatarprofile)
router.route('/updateusername').patch(isloggedin,updateuserdetails)
router.route('/getchannelprofile/:userid').get(getchannelprofile)
export {router}