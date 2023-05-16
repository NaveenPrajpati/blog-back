const mongoose=require('mongoose');
const otpGenerator = require('otp-generator');
const mailSender = require("../utils/mailSender");
const User=require('./userModel')

const otpSchema=new mongoose.Schema({
    email:{type:String,required:true},
    createdAt:{type:Date,default:Date.now(),expires:5*60},
    otp:{type:String,required:true},
})

async function sendVerificationMail(email,otp){
    try{
        const mailRes=await mailSender(email,"conformation mail",otp)

        console.log('mail sent to- '+email)
    }catch (error){
        console.log("error occur while sending mail",error);
        throw error;
    }
}

otpSchema.pre('save',async function(next){
    console.log(this.email)
    await sendVerificationMail(this.email,this.otp)
})



module.exports=mongoose.model('otpMod',otpSchema);