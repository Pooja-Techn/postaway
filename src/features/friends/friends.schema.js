import mongoose from "mongoose";

const FriendSchema = new mongoose.Schema({

    Email: String,
    Name: String,
    SenderID: String,
    ReceiverID: String,
    Status: String

})

export const friendmodel = mongoose.model("friends", FriendSchema)