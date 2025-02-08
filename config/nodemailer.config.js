import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "poojasonare2712@gmail.com",
        pass: "mnua eaiu nrgu finm"
    }
})

export default transporter;