import FriendRepository from "./friends.repository.js";

export default class FriendController{
    constructor()
    {
        this.friendRepository = new FriendRepository();
    }

    async sendRequest(req, res, next)
    {
        try{
        const { email, name } = req.body;
        const userID = req.userID;
        const userProfile = await this.friendRepository.addFriend(email, name, userID );
        if(userProfile)
        {
            return res.status(200).send(userProfile);
        }
        }
        catch(err)
        {
            res.status(400).send(err);
            next(err);
        }
    }
    
}