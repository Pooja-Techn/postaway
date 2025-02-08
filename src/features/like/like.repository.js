import { LikeSchema } from "./like.schema.js";
import mongoose, { get } from "mongoose";
const LikeModel= mongoose.model("likes", LikeSchema)


export default class LikeRepository
{
    constructor()
    {
        this.collection = "likes"
    }

    async getLikes(userID, postId)
    {
        try
        {
        const getlike = await LikeModel.findOne({userID, uniqueID: postId})
        console.log(getlike)
        return getlike
    }
    catch(err)
    {
        console.log(err);
    }
    }

    async getLike(postId)
    {
        try
        {
        console.log("getlike");
        const getlike = await LikeModel.find({ uniqueID: postId})
        console.log(getlike)
        return getlike
    }
    catch(err)
    {
        console.log(err);
    }
    }




    async deleteLike(userID, postId)
    {
        try{
        const item = await LikeModel.deleteOne({userID, uniqueID: postId});
        return item.deletedCount
    }
    catch(err)
    {
        console.log(err);
    }
    }


    async addLike(like)
    {
        try{
            const item = await LikeModel(like)
            await item.save()
            return item
        }
        catch(err)
        {
            console.log(err);
        }
        
    }



}