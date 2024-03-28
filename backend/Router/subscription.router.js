import { isloggedin } from "../Middleware/auth.middleware.js";
import { Router } from "express";
import { nofsubscriber, togglesubscription,checksubscriber} from "../Controllers/subscription.controller.js";
export const subsrouter= Router();
subsrouter.route('/:subscriberid/:channelid').post(isloggedin,togglesubscription).get(checksubscriber);
subsrouter.route('/:channelid').get(nofsubscriber)