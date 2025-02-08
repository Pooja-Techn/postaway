import mongoose from "mongoose";

export const authenticationSchema = new mongoose.Schema({
    name:String,
    email: String,
    password: String,
    gender: String, enum: ["male","female","other"],
    tokens: [{ type: Object}]
    
});