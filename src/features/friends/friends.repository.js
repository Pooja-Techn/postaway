import AuthenticationRepository from "../authentication/authentication.repository.js";
import { friendmodel } from "./friends.schema.js";
export default class FriendRepository
{
    constructor()
    {
        this.collection = "friends";
        this.authenticationRepository = new AuthenticationRepository();
    }

    async addFriend(email, name , userID)
    {
        try{
        const getuser = await this.authenticationRepository.findByEmail(email);
        console.log(getuser);
        if(getuser)
        {
            const userprofile = await friendmodel.create({Email: email, Name: name, Status: "Pending", SenderID: userID, ReceiverID:  getuser._id});
            return userprofile
        }
    }
    catch(err)
    {
        console.log(err)
    }

    }


}