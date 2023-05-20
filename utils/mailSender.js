const nodemailer=require('nodemailer')
const transporter = require("../config/mailerConfig");


const mailSender=async (email,title,body)=>{
    let mailOptions = {
        from: 'naveen',
        to: email,
        subject:title,
        html:`<div> <h2>this is your otp</h2> <h1>${body}</h1></div>`
    };


   await transporter().sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            return info;
        }
    });
}
module.exports=mailSender