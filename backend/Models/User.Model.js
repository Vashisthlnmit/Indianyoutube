import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "the password is required"],
    },
    avatar: {
        type: String,
        required: true,
    },
    refreshtoken: {
        type: String,
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "video"
        }
    ]

}, { timestamps: true })
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})
userSchema.methods = {
    ComparePassword: async function (password) {
        return await bcrypt.compare(password, this.password)
    },
    Generateaccesstoken: async function () {
        const accesstoken = await jwt.sign({
            _id: this._id,
            username: this.username,
            email: this.email,
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_TIME })
        return accesstoken;
    },
    Generaterefreshtoken: async function () {

        const refreshtoken=await jwt.sign({
            _id: this._id
        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_TIME })
        return refreshtoken;
    }
}
export const user = mongoose.model("user", userSchema)