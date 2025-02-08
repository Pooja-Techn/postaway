import CommentsModel from "./comments.model.js";
import CommentsRepository from "./comments.repository.js";

export default class CommentsController{

    constructor()
    {
        this.commentsRepository = new CommentsRepository()
    }


    async addComment(req, res, next)
    {
        try{
        const comment = req.body.comment
        const postId = req.params.postId;
        const userID = req.userID;
        console.log(comment, postId, userID)
        const newcomment = new CommentsModel(postId, userID, comment)
        console.log(newcomment)
        const getcomment = await this.commentsRepository.createComment(newcomment)
        return res.status(200).send(getcomment)
        }
        catch(err)
        {
                res.status(500).send(err)
                next(err)
        }

    }

    //get comments
    async getComments(req, res, next)
    {
        try{
        const postId = req.params.postId;     
        const getcomment = await this.commentsRepository.getComments(postId)
        return res.status(200).send(getcomment)
        }
        catch(err)
        {
                res.status(500).send(err)
                next(err)
        }
    }

    async updateComment(req, res, next) 
    {
        try{
        const userID = req.userID
        const commentId = req.params.commentId;
        const comment = req.body.comment;
        const updatecomment = await this.commentsRepository.updateComment(userID, commentId, comment)
        return res.status(201).send(updatecomment)
    }
    catch(err)
    {
            res.status(500).send(err)
            next(err)
    }
    }

    async deleteComment(req, res, next)
    {
        try{
        const commentId = req.params.commentId;
        const deletedcomment = await this.commentsRepository.deleteComment(commentId);
        return res.status(400).send(deletedcomment)
    }
    catch(err)
    {
            res.status(500).send(err)
            next(err)
    }
    }

}