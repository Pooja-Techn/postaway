import express from 'express';
import AuthenticationController from './authentication.controller.js';
import { jwtAuth } from '../../../middlewares/jwt.middleware.js';

const AuthenticationRouter = express.Router();

const authenticationController = new AuthenticationController();

AuthenticationRouter.post("/signup", (req, res, next)=>{  authenticationController.register(req, res, next)});
AuthenticationRouter.post("/signin",(req,res,next) =>{ authenticationController.signIn(req,res,next)});
AuthenticationRouter.get("/get-all-details",jwtAuth,(req,res,next) =>{
    console.log("route error");
    authenticationController.getUsers(req,res,next)});
AuthenticationRouter.post("/logout",jwtAuth,(req,res,next) =>{ authenticationController.logoutCurrent(req,res,next)});
AuthenticationRouter.post("/logout-all-devices",jwtAuth,(req,res,next) =>{ authenticationController.logoutAll(req,res,next)});



export default AuthenticationRouter;