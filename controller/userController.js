const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.registerUser=asyncHandler(async(req,res)=>{
    const{username,email,password}=req.body;
    // console.log(username+email+password)
    if(!username || !email || !password){
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

    const user=await userModel.create({username,email,password:hashedPassword});
    if(user){
        res.status(201).json({_id:user.id,email:user.email,username:user.username})
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
    const user=await userModel.findOne({email});

    //compare password with hashpassword
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },
        },process.env.ACCESS_TOKEN_SECREC,{expiresIn:"15m"});
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