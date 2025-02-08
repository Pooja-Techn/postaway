import mongoose from "mongoose";
import { authenticationSchema } from "./authentication.schema.js";
import ApplicationError from "../../../error-handler/applicationError.js";
import { ObjectId } from "mongodb";
const AuthenticationModel = mongoose.model('authentications', authenticationSchema);
import bcrypt from "bcrypt";
export default class AuthenticationRepository {

    constructor()
    {
        this.collection = "authentications";
    }

    async registerUser(newUser)
    {
        try{
        const newUserCreated = await AuthenticationModel(newUser);
        newUserCreated.save();
        //save in friends db
        
        return newUserCreated;
        }
        catch(err)
        {
            console.log(err);
            throw new ApplicationError("Something went wrong while register", 500);
        }
    }

    async findByEmail(email)
    {
        try{
        const user =  await AuthenticationModel.findOne({email});
        return user;
        }
        catch(err)
        {
            console.log(err);
            throw new ApplicationError("Something went wrong while register", 500);
        }
    }
    async getUsers()
    {
        console.log("repo1")
       try{
        console.log("repo2")
        const users = await AuthenticationModel.find()
        if(users.length > 0)
        {
            console.log(users)
            return users;
        }
        else{
            console.log("Not user found");
            
        }
    }
    catch(err)
    {
        console.log(err);
        console.log("error from repo")
        throw new ApplicationError("Something went wrong", 500);
        return
    }
    }

    async updatePassword(email, newPassword)
    {
        try{
            
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const newuser = await AuthenticationModel.findOneAndUpdate({email}, {$set:{ password: hashedPassword}})
        return newuser
        }
        catch(err)
        {
            console.log(err);
        }

    }

    //append token to authentication collection
    // async addToken(token, userId)
    // {
    //     const user = await AuthenticationModel.findOne({_id: userId});        try{
    //         //check if any tokens in db
    //         let oldTokens = user.tokens || []

    //         if(oldTokens.length)
    //         {
    //             //getting active tokens
    //             oldTokens = oldTokens.filter(t=>
    //             {
    //                 const timeDiff = (Date.now() - parseInt(t.signAt)/1000)
    //                 //86400 is 24hr in sec
    //                 if(timeDiff < 86400){
    //                     return t
    //                 }
    //             }
    //             )
    //         }



    //         //keep only active tokens and add new token
    //         return await AuthenticationModel.findByIdAndUpdate(userId, { tokens: [...oldTokens,{ token,signAt: Date.now().toString()}]},{new: true});
    //     }
    //     catch(applicationError){
    //         throw new applicationError("Something went wrong", 500);
    //     }       
    // }

    // async addToken(token, userId)
    // {
    //     const user = await AuthenticationModel.findOne({_id: userId});  
    //           try{
    //             console.log("user");
    //             console.log(user)
    //         //check if any tokens in db
    //         let oldTokens = user.tokens || []
    //         let oldTokensnew;
    //         if(oldTokens.length)
    //         {
    //             //getting active tokens
    //             oldTokensnew = oldTokens.filter(t=>
    //             {
    //                 const timeDiff = (Date.now() - parseInt(t.signAt)/1000)
    //                 //86400 is 24hr in sec
    //                 if(timeDiff < 86400){
    //                     console.log("active tokens")
    //                     console.log(t)
    //                     return t
    //                 }
    //             }
    //             )
    //         }

    //         console.log(oldTokensnew)

    //         //keep only active tokens and add new token
    //         return await AuthenticationModel.findByIdAndUpdate(userId, { tokens: [...oldTokensnew,{ token,signAt: Date.now().toString()}]},{new: true});
    //     }
    //     catch(err){
    //        // throw new applicationError("Something went wrong", 500);
    //         throw new Error("Something went wrong")
    //     }       
    // }

    async addToken(token, userId)
    {
        const user = await AuthenticationModel.findById({_id: userId});  
              try{
                return user.tokens.push(token)

                 //keep only active tokens and add new token
            
            
        }
        catch(err){
           // throw new applicationError("Something went wrong", 500);
            throw new Error("Something went wrong")
        }       
    }


    async findByToken(token) {
        try {
            const user = await AuthenticationModel.findOne({ tokens: token });
            if (!user) {
                throw new ApplicationError('Invalid token or user not found', 404);
            }
            return user;
        } catch (err) {
            console.error('Error in findByToken:', err);
            throw new ApplicationError('Something went wrong', 500);
        }
    }

    //delete token from authentications collection    
    async deleteToken(newtokens, user)
    {
        try{
        //add new tokesn
        const updateduser = await AuthenticationModel.findByIdAndUpdate({_id: user.id}, { tokens: newtokens})
        return updateduser
        }
        catch(err)
        {
            console.log(err);
            throw new ApplicationError('Something went wrong', 500);
        }
    }

    async logoutAll(userId)
    {
          const user = await AuthenticationModel.findOne({_id: userId});
          console.log("user");
          console.log(user);
          try{
            return await AuthenticationModel.findByIdAndUpdate(user._id, { $set: { tokens: []}},{new: true});
        }
        catch(err){
            console.log(err);
            throw ApplicationError("Something went wrong", 500);
        }  

    }
} 