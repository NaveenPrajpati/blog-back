const mongoose=require('mongoose');
const otpGenerator = require('otp-generator');
const mailSender = require("../utils/mailSender");
const User=require('./userModel')

const otpSchema=new mongoose.Schema({
    email:{type:String,required:true},
    createdAt:{type:Date,default:Date.now(),expires:300},
    otp:{type:String,required:true},
    actonFor:{type:String}
})

async function sendVerificationMail(email,otp,action){
    try{
        const mailRes=await mailSender(email,"conformation mail",otp,action)

        console.log('mail sent to- '+email)
    }catch (error){
        console.log("error occur while sending mail",error);
        throw error;
    }
}

otpSchema.pre('save',async function(next){
    await sendVerificationMail(this.email,this.otp,this.actonFor)
})



module.exports=mongoose.model('otpMod',otpSchema);