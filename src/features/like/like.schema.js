import mongoose from "mongoose";

export const LikeSchema = new mongoose.Schema({
    userID: String,
    uniqueID: String,

})