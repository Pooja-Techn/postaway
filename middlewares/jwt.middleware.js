import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { authenticationSchema } from '../src/features/authentication/authentication.schema.js';

const AuthenticationModel = mongoose.model('authentications', authenticationSchema);

export const jwtAuth = async(req, res, next) =>{
   // const authtoken = req.headers['authorization'];
    const token = req.cookies.token;

    //const currentToken = req.cookies.filter(t => t == authtoken)
    

    

//    const tokens = [];
//    tokens.push(token);
        
    try{
        if(!token)
            {
                console.log("unauthorized token");
                return res.status(401).send('token unauthorized.');
                
            }

        const payload = jwt.verify(token, "ABC");
        console.log(payload);
       
        req.userID = payload.userID;
     
       const user = await AuthenticationModel.findById(payload.userID);
        // if (!user || !Array.isArray(user.tokens) || !user.tokens.includes(token)) {
           // return res.status(401).send('Please logged in again.');
       // }
       req.user = user;
       console.log("user")
       console.log(user)
        next();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     

    }
    catch(err)
    {
        console.log(err);
        res.status(401).send("unauthorized payload");    
        next()    
    }
   // next()

}