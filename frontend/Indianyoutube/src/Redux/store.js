import { configureStore } from '@reduxjs/toolkit'
import authentication from './authentication.js'
import videoreducer from './videoreducer.js'
import playlist from './playlist.js'
import comment from './comment.js'
import likes from './likes.js'
import subscription from './subscription.js'
export const store=configureStore({
    reducer:{
        auth:authentication,
        videoconven:videoreducer,
        play:playlist,
        comment:comment,
        like:likes,
        subscribe:subscription
    }
})