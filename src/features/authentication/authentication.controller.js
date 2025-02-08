import AuthenticationModel from "./authentication.model.js";
import AuthenticationRepository from "./authentication.repository.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import ApplicationError from "../../../error-handler/applicationError.js";
import cookieParser from "cookie-parser";
//import sessionStorage from "sessionstorage";


export default class AuthenticationController {

    constructor()
    {
        this.authenticationRepository = new AuthenticationRepository();
    }
    async register(req, res, next)
    {
        try{
            const {name,email,password, gender} = req.body;
            const hashedPassword = await bcrypt.hash(password, 12);                        
            const newUser = new AuthenticationModel(name, email,hashedPassword, gender);
            await this.authenticationRepository.registerUser(newUser);
            res.status(201).send(newUser);
            }
            catch(err)
            {
                console.log(err);
                next(err);
            }
    }

    async signIn(req, res, next) {
        try{
          // 1. Find user by email.
          const user = await this.authenticationRepository.findByEmail(req.body.email);
          if(!user){
            return res
            .status(400)
            .send('Incorrect Credentials');
          } else {
            //2. Compare password with hashed password.
           const result = bcrypt.compare(req.body.password, user.password);
            if(result){
              // 3. Create token.
              const token = jwt.sign(
                {
                  userID: user._id,
                  email: user.email,
                },
                //process.env.JWT_SECRET,
                "ABC",
                {
                  expiresIn: '1d',
                }
              );

           //
       

          

        //append token in db
         await this.authenticationRepository.addToken(token, user._id );
        

        
              // sessionStorage.setItem('token', token); // Store token in sessionStorage
          res.cookie('token', token, {
            httpOnly: true,
            secure: true, // Set to true in production (requires HTTPS)
            sameSite: 'strict', // Prevent cross-origin requests
            maxAge: 24* 60 * 60 * 1000, // 1 hour,
        
        });


          //if(updateToken){ console.log("token added successfully")}else{  console.log("not updated")}
          // 4. Send token.
          return res.status(200).send(token);
            } else {
              return res
            .status(400)
            .send('Incorrect Credentials');
            }
          }
      } catch(err){
          console.log(err);
          next(err);
          //return res.status(200).send("Something went wrong");
        }
      }

    async getUsers(req, res,next)
    {
      console.log("getuser")
        try{ 
        const users = await this.authenticationRepository.getUsers();
        console.log(users);
        res.status(200).send(users);
        }
        catch(err)
        {
          console.log("error from getUsers")
          res.status(402).send(err);  
          console.log(err);
            next(err);
          } 
         }

  //   async logoutCurrent(req, res, next)
  //   {
  //     try{
  //     const userID = req.userID;
  //     //delete token from session
  //     // const token = req.headers.authorization
  //      // if(req.headers && req.headers.authorization)
  //      // {
  //         //const token = req.headers.authorization;
  //         const token = req.cookies.token;
        
          

          
  //    //sessionStorage.removeItem('token');
  //    res.clearCookie('token', {
  //      httpOnly: true,
  //      secure: true, // Set to true in production
  //      sameSite: 'strict',
  //  });
  //         //const token = sessionStorage.getItem('token');
  //         // if(!token)
  //         // {
  //         //   return res.status(401).send("Authorization failed");

  //         // }
  //         //console.log(req.user);
  //         //console.log(req.user.tokens);
  //        // console.log(token)
  //         const tokens = req.user.tokens;
          

          
  //         //sessionStorage.removeItem('token');
  //         res.clearCookie('token', {
  //           httpOnly: true,
  //           secure: true, // Set to true in production
  //           sameSite: 'strict',
  //       });
          
  //         const newtokens = tokens.filter(t => t.token !== token)
  //           //remove token from db
  //         const result = await this.authenticationRepository.deleteToken(newtokens, req.user);
  //         if(result)
  //           {
  //             return res.status(400).send("logout successfully.");
  //           }
  //           else{
  //             return res.status(401).send("not token found");
      
  //           }
  //   // }
    

     
  //   }
  //   catch(err)
  //   {
  //     console.log(err);
  //     next(err);
  //   }
    
  //   }


  // async logoutCurrent(req, res, next)
  // {
  //   try{
  //   const userID = req.userID;
  //   const token = req.cookies.token;
  //   if(token){
  //   const tokens = req.user.tokens;
  //   const newtokens = tokens.filter(t => t.token !== token)
    
  //   //remove token from db
  //   const result = await this.authenticationRepository.deleteToken(newtokens, req.user);
    
  //   res.clearCookie('token').json({msg:"logOut Successful", "token" : token })
  //   }
   
  // }
  // catch(err)
  // {
  //   console.log(err);
  //   next(err);
  // }
  
  // }
  async logoutCurrent(req, res, next) {
    try {
        const token = req.cookies.token;
      

        if (!token) {
            return res.status(400).json({ msg: "Token not found, unable to log out." });
        }

        const user = req.user

        if (!user) {
            return res.status(400).json({ msg: "Invalid token, unable to log out." });
        }

        // Remove only the current token
        const newTokens = user.tokens.filter((t) => t !== token);

        // Update the database
        await this.authenticationRepository.deleteToken(newTokens, user);

        // Clear the cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });

        return res.status(200).json({ msg: "Logout Successful" });
    } catch (err) {
        console.error(err);
        next(err);
    }
}
  

    async logoutAll(req, res, next)
    {
        try{
        const userId = req.userID;
        if (userId){
          console.log("delete all tokens")
        const tokens = req.user.tokens;

        tokens.forEach(t => {
          
          res.clearCookie('token').json({msg:"logOut Successful", "token" : t})
        });
        ///return res.clearCookie('token').json({msg:"logOut Successful"})


        }

      //   console.log(userId);
      //  // const result = await this.authenticationRepository.logoutAll(userId);
      //   if(userId)
      //   {
      //     return res.status(200).send("Logout successfully");
      //   }
      //   else{
      //     console.log("error occured");
      //   }
      }
      catch(err)
      {
        console.log("error while deleting all tokens")
        return res.status(401).send(err);
      }

    }
        
    
}