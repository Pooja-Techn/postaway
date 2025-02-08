import express from "express";
import FriendController from "./friends.controller.js";
//import jwt from "jsonwebtoken";
import { jwtAuth } from "../../../middlewares/jwt.middleware.js";

//create router
const FriendRouter = express.Router();
const friendController = new FriendController();

//first check like exist for user, if then remove else add
FriendRouter.post("/sendrequest",jwtAuth, (req,res, next) =>{friendController.sendRequest(req, res, next)});
//FriendRouter.get("/:id",jwtAuth,(req, res, next) =>{FriendController.getLikes(req, res, next)});

export default FriendRouter;