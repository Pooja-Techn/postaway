import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: { type: String},
    otp: { type: String},
    expiresAt:{ type:Date, required: true}
})

export const otpmodel = mongoose.model("otp", otpSchema)