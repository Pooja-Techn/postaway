import express from 'express';
import PostController from './post.controller.js';
import { jwtAuth } from '../../../middlewares/jwt.middleware.js';

const PostRouter = express.Router();

const postController = new PostController();

PostRouter.post("/",jwtAuth, (req, res, next) =>{ postController.create(req, res, next)});
PostRouter.get("/", jwtAuth,(req, res, next) =>{ postController.get(req, res, next)});
PostRouter.get("/:id", jwtAuth,(req, res, next) =>{ postController.getOne(req, res, next)});
PostRouter.delete("/:id", jwtAuth,(req, res, next) =>{ postController.deleteOne(req, res, next)});
PostRouter.put("/:id", jwtAuth,(req, res, next) =>{ postController.modifyOne(req, res, next)});

export default PostRouter;