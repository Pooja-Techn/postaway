import mongoose from "mongoose";

export default class LikeModel 
{
    constructor(userID, uniqueID)
    {
        this.userID = userID ;
        this.uniqueID = uniqueID;
     
    }

    static getLikes(postId)
    {
        const likes = Likes.filter(l => l.postID == postId);
        return likes
    }

    static getLike(userId, postid)
    {
        const like = Likes.find(l => l.userID = userId && l.postID == postid);
        return like

    }

    static deleteLike(userId, postId)
    {
        const likeIndex = Likes.findIndex(l => l.userID = userId && l.postID == postId);
        Likes.slice(likeIndex,1)
    }

    static addLike(userID, postID)
    {
        const like = new LikeModel(userID, postID, Likes.length+1)
        Likes.push(like)
        return like
    }   



}

const Likes = []