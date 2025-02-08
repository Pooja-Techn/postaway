import LikeModel from "./like.model.js";
import LikeRepository from "./like.repository.js";

export default class LikeController
{
    constructor()
    {
        this.likerepository = new LikeRepository()
    }
    async getLikes(req, res)
    {
        const userID = req.userID;
        const postId = req.params.id;
        const likes = await this.likerepository.getLike(postId);
        if(likes)
        {
            res.status(200).send(likes)
        }
        else{
            res.status(402).send("like doesn't exist")
        }
    }
    async toggleLikes(req, res,next)
    {
        try{
        const userID = req.userID;
        const postid = req.params.id;
        const likeexist = await this.likerepository.getLikes(userID, postid);
        if(likeexist)
            {
                console.log(likeexist)
                this.likerepository.deleteLike(userID, postid);
                res.status(200).send("like deleted")
            }
            else{
                const like = new LikeModel(userID, postid)
                const newlike = this.likerepository.addLike(like)
                console.log(newlike)
                res.status(402).send(like);
            }
        }
        catch(err)
        {
            console.log(err)
            next(err)
        }
    }

}