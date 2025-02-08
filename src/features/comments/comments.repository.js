import mongoose from "mongoose"
import { CommentsSchema } from "./comments.schema.js"
import { ObjectId } from "mongodb"
//import ApplicationError from "../../../error-handler/applicationError";
const CommentsModel = mongoose.model("comments", CommentsSchema)
export default class CommentsRepository{

    constructor(){
        this.collection = "comments"
    }

    async createComment(newcomment)
    {
        try{
        const comment = new CommentsModel(newcomment);
        await comment.save();
        return comment
        }
        catch(err)
        {
            console.log(err)
        }
    }

    async getComments( postId)
    {
        try{
            const comments = await CommentsModel.find({postID: postId})
            return comments
        }
        catch(err)
        {
            console.log(err);
        }
    }
    async updateComment( userID, commentId, commentText)
    {
        try{
            const comment = await CommentsModel.findOneAndUpdate({_id: new ObjectId(commentId)}, {$set: { comment: commentText}})
            return comment
        }
        catch(err)
        {
            console.log(err);
        }
    }
    async deleteComment( commentId)
    {
        try{
            const comment = await CommentsModel.deleteOne({_id: new ObjectId(commentId)})
            return comment
        }
        catch(err)
        {
            console.log(err);
        }
    }

}