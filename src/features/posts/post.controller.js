import PostModel from "./post.model.js";
import PostRepository from "./post.repository.js";

export default class PostController{

    constructor()
    {
        this.postRepository = new PostRepository();
    }
    //create post
    async create(req, res, next)
    {
        try{
            const userID = req.userID;
        const { caption, imageUrl} = req.body;  
        const newPost= new PostModel(userID, caption, imageUrl);
        await this.postRepository.createPost(newPost);
        return res.status(200).send("Post Created")
        }
        catch(err){
            console.log(err);
            next(err);
          
          }                 

        
    }

    //get all post
    async get(req, res, next)
    {
        try{
        const userID = req.userID;    
        console.log("reqID");
        console.log(userID);
        const products = await this.postRepository.getAll(userID);
        return res.status(200).send(products);
        }
        catch(err){
            console.log(err);
            next(err);          
          }                  
        
    }
    

    //get one post by id
    async getOne(req, res, next)
    {
        try{
        const postId= req.params.id;   
        console.log(postId);
        const post= await this.postRepository.getOne(postId);
        return res.status(200).send(post);
        }
        catch(err){
            console.log(err);
            next(err);          
          }             
    }
    //get one post by id
    async deleteOne(req, res, next)
    {
        try{
        const userId = req.userID;
        const postId= req.params.id;   
        console.log(postId);
        const post= await this.postRepository.deleteOne(userId, postId);
        if(post)
        {
        return res.status(200).send("post got deleted");
        }
        else{
            return res.status(500).send("something wrong with deletion");
        }
        }
        catch(err){
            console.log(err);
            next(err);          
          }             
    }

    async modifyOne(req, res, next)
    {
        try{
            const userId = req.userID;
            const postId= req.params.id;   
            const {caption, imageUrl} = req.body;
            const updatePost = new PostModel(userId, caption, imageUrl)
            console.log(postId);
            const post= await this.postRepository.modifyOnePost(userId, postId, updatePost);
            if(post)
            {
            return res.status(200).send(post);
            }
            else{
                return res.status(500).send("something wrong with updation");
            }
            }
            catch(err){
                console.log(err);
                next(err);          
              } 
    }

}