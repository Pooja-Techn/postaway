import express from "express";
import LikeController from "./like.controller.js";
//import jwt from "jsonwebtoken";
import { jwtAuth } from "../../../middlewares/jwt.middleware.js";

//create router
const likeRouter = express.Router();
const likeController = new LikeController();

//first check like exist for user, if then remove else add
likeRouter.post("/toggle/:id",jwtAuth, (req,res, next) =>{likeController.toggleLikes(req, res, next)});
likeRouter.get("/:id",jwtAuth,(req, res, next) =>{likeController.getLikes(req, res, next)});




export default likeRouter;