import mongoose from "mongoose";

export const CommentsSchema = new mongoose.Schema({
    userID: String,
    postID: String,
    comment: String
})