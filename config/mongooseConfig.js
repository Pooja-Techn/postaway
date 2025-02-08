import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const url = "mongodb://127.0.0.1:27017/socialdb";

export const connectToMongooose = async()=>
{
    try{
    await mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("Connected to mongoose");
}
catch(err)
{
    console.log(err);
}
}