import express from "express";
import OTPController from "./otp.controller.js";  //import jwt from "jsonwebtoken";
import { jwtAuth } from "../../../middlewares/jwt.middleware.js";

//create router
const OTPRouter = express.Router();
const otpController = new OTPController();

//first check like exist for user, if then remove else add
OTPRouter.post("/send",jwtAuth, (req,res, next) =>{otpController.sendOTP(req, res, next)});
OTPRouter.post("/verify",jwtAuth,(req, res, next) =>{otpController.verifyOTP(req, res, next)});
OTPRouter.post("/reset-password", jwtAuth, (req, res, next) =>{ otpController.resetPassword(req, res, next)});
export default OTPRouter;