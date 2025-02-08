import mongoose from "mongoose";
import { postSchema } from "./post.schema.js";
import ApplicationError from "../../../error-handler/applicationError.js";
import { ObjectId } from "mongodb";
const PostModel = mongoose.model("posts", postSchema);
export default class PostRepository{

    constructor()
    {
        this.collection = "posts";
    }
    async createPost(newPost)
    {
        try{
        const post = new PostModel(newPost);
        await post.save();
        return post;
        }
        catch(err)
        {
            console.log(err)
            throw new ApplicationError("Something wrong with database", 500);
        }

    }

    async getAll(userId)
    {
        try{
        const products = await PostModel.find({userID: userId});
        return products;
        }
        catch(err)
        {
            console.log(err);
        }
    }

    async getOne(postId)
    {
        try{
        
        const product= await PostModel.findById(postId)
        console.log(product);
        return product;
        }
        catch(err)
        {
            console.log(err);
        }
    }

    async deleteOne(userId, postId)
    {
        try{
        
        const product= await PostModel.deleteOne({_id: new ObjectId(postId), userID: userId});
        console.log(product);
        return product;
        }
        catch(err)
        {
            console.log(err);
        }
    }

    async modifyOnePost(userId, postId, postData)
    {
        try{
        //const updatePost = new PostModel(postData);        
        const post= await PostModel.findOneAndUpdate({_id: new ObjectId(postId), userID: userId}, 
        {$set: postData},
        {new: true, runValidators: true});// new:true return modified document
        console.log(post);
        if(post)
        {
            return post;
        }
        else{

            console.log("no post found");
        }        
        }
        catch(err)
        {
            console.log(err);
        }
    }
}