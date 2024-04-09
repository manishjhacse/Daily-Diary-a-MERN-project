const nodemailer = require("nodemailer");
require("dotenv").config();
module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
    //   host: process.env.HOST,
    //   service: process.env.SERVICE,
    //   port: Number(process.env.EMAIL_PORT),
    //   secure: Boolean(process.env.SECURE),
    service: "hotmail",
      auth: {
        user: process.env.EMAILID,
        pass: process.env.EMAILPASSWORD,
      },
    //   tls: {
    //     minVersion: 'TLSv1.2',
    //   },
    });
    await transporter.sendMail({
      from: process.env.EMAILID,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email send")
  } catch (err) {
    console.log(err)
    console.log("Error while sending mail")
  }
};
