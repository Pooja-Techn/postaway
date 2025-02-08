import mongoose from "mongoose";

export const postSchema = new mongoose.Schema({
    userID: String,
    caption : String ,
    imageUrl: String
})