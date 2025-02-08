import { otpmodel } from "./otp.schema.js";

export default class OTPRepository{
    constructor()
    {
        this.collection = "otps"
    }

    async generateOTP(email) {
    const otps = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    const expiresAt = new Date(Date.now() + 5 * 60000); // OTP expires in 5 minutes
    console.log(otps)
    await otpmodel.create({ email, otp: otps, expiresAt });
    return otps;
    }

    async findOTP(email, otp)
    {
        try{
        const getotp = await otpmodel.findOne({email, otp})
        return getotp
        }
        catch(err)
        {
            console.log(err)    
        }
    }
    async deleteOTP(email, otp)
    {
        try{
        const getotp = await otpmodel.deleteOne({email, otp})
        return getotp.deletedCount
        }
        catch(err)
        {
            console.log(err)    
        }

    }

}