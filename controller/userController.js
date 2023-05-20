const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');
const otpModel=require('../models/otpModel')
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');


exports.registerUser=asyncHandler(async(req,res)=>{
    console.log(req.body)

    const{firstName,lastName,email,password,confpass,otp}=req.body;
    const ot=await otpModel.findOne({otp:otp});
    console.log(ot)
    if(otp!==ot.otp){
        console.log(ot)
        res.status(500).json({
            success:false,
            message:"fail to validate otp"
        })
    }
    if(!firstName || !lastName || !email || !password){
        res.status(400);
        throw new Error("all field ara necessary")
    }
    const userPresent=await userModel.findOne({email});
    if(userPresent){
        res.status(400);
        throw new Error("user already present");
    }


    //hash password
    const hashedPassword=await bcrypt.hash(password,10);

    const user=await userModel.create({firstName,lastName,email,password:hashedPassword});
    if(user){
        res.status(201).json({_id:user.id,email:user.email,firstName:user.firstName})
    }else{
        res.status(400);
        throw new Error("user data not valid");
    }
    res.json({
        message:"register user"
    });
});



exports.loginUser=asyncHandler(async(req,res)=>{

    const {email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("all fields are necessary"); 
    }
    const findUser=await userModel.findOne({email});
console.log(findUser)
    //compare password with hashpassword
    if(findUser && (await bcrypt.compare(password,findUser.password))){
     const user={
            name:findUser.firstName,
                email:findUser.email,
                id:findUser._id,
        }
        const accessToken=jwt.sign({
            user,
        },process.env.ACCESS_TOKEN_SECREC,{expiresIn:"1h"});


        res.status(200).json({
            token:accessToken,

            user
        });
    }
    else{
        res.status(401)
        throw new Error("email or password invalid")
    }
});


//access private
exports.currentUser=asyncHandler((req,res)=>{
    res.json(req.user);
});