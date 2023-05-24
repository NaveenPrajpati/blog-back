const nodemailer=require('nodemailer')
const transporter = require("../config/mailerConfig");
const otpTemplate =require('./otpTemplate');


const mailSender=async (email,title,body,action)=>{
    console.log(action,body,email,title)
    let mailOptions = {
        from: 'naveen',
        to: email,
        subject:title,
        html:otpTemplate(body,action)
    };


   await transporter().sendMail(mailOptions, function(error, info){
        if (error) {

            console.log( "ye error hai-",error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports=mailSender
