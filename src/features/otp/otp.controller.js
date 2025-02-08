import AuthenticationRepository from "../authentication/authentication.repository.js";
import OTPRepository from "./otp.repository.js";
import transporter from "../../../config/nodemailer.config.js";


export default class OTPController
{
    constructor()
    {
        this.otprepository = new OTPRepository();
        this.authenticationRepository = new AuthenticationRepository();
    }

    async sendOTP(req, res, next)
    {
        const {email} = req.body;
        try {
        const user = await this.authenticationRepository.findByEmail(email);
        if (!user) return res.status(404).json({ message: "User not found" });

        const otp = await this.otprepository.generateOTP(email);

        // Send OTP Email
        await transporter.sendMail({
            from: "poojasonare2712@gmail.com",
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP is: ${otp}. It expires in 5 minutes.`,
        });

        return res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error sending OTP", error });
        next(error)
    }

        
    }
    
    //verify otp
    async verifyOTP(req, res, next)
    {
        try{
            const {email, otp} = req.body;
            const getotp = await this.otprepository.findOTP(email, otp)
            if(getotp)
            {
                res.status(200).send("verified successfully.")
            }
            else{
                res.status(402).send("Invalid OTP")
            }
        }
        catch(err)
        {
            console.log(err)
            next(err)
        }
    }

    //reset password
    async resetPassword(req, res, next)
    {
        const { email, otp, password} = req.body;
        try{
            const getotp = await this.otprepository.findOTP(email, otp)
            if(getotp)
            {
                const updateduser = await this.authenticationRepository.updatePassword(email,password )
                const deleteOTP = await this.otprepository.deleteOTP(email, otp)
                res.status(200).send({updateduser, deleteOTP})
            }
            else{
                res.status(402).send("Invalid OTP");
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }

}