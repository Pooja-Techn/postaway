import express from 'express';
import CommentsController from './comments.controller.js';
import { jwtAuth } from '../../../middlewares/jwt.middleware.js';

const CommentsRouter = express.Router();

const commentsController = new CommentsController();

CommentsRouter.post("/:postId",jwtAuth, (req, res, next)=>{  commentsController.addComment(req, res, next)});
CommentsRouter.get("/:postId",jwtAuth,(req,res,next) =>{ commentsController.getComments(req,res,next)});
CommentsRouter.put("/:commentId",jwtAuth,(req,res,next) =>{
commentsController.updateComment(req,res,next)});
CommentsRouter.delete("/:commentId",jwtAuth,(req,res,next) =>{ commentsController.deleteComment(req,res,next)});



export default CommentsRouter;