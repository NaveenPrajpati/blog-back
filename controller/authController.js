const User = require("../models/userModel");
const otpGenerator = require("otp-generator");
const OTP=require("../models/otpModel")



exports.sendOtp = async(req, res, next) => {
    try{
        //check for users presence
        const {email} = req.body;

        const userPresent = await User.findOne({email});

        if(userPresent)
            return res.status(401).json({
                success:false,
                message:"user already register"
            })

        // Generate a unique seed value using the current timestamp in milliseconds.
        const seed = new Date().getTime().toString();

        let otp = otpGenerator.generate(6, {digits: true, alphabets: false, upperCase: false, specialChars: false},seed);

        // //check unique otp
        // let result=await OTP.findOne({otp})
        //
        // while (result){
        //     otp = otpGenerator.generate(6, {digits: true, alphabets: false, upperCase: false, specialChars: false},see);
        //     result=await OTP.findOne({otp:otp})
        // }
        const actonFor='signup'
        const otpPayload={email,otp,actonFor};

        //create entry for otp
        const otpBody=await OTP.create(otpPayload);

        res.status(200).json({
            success:true,
            message:'otp sent successfully',
            otp
        })

        // Call the next middleware function in the chain.
        next();
    }catch (error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })

    }
};

exports.resetOtp = async(req, res, next) => {
    try{
        //check for users presence
        const {email} = req.body;
        const userPresent = await User.findOne({email});
        if(!userPresent)
            return res.status(401).json({
                success:false,
                message:"user not register with us"
            })

        // Generate a unique seed value using the current timestamp in milliseconds.
        const seed = new Date().getTime().toString();
        let otp = otpGenerator.generate(6, {digits: true, alphabets: false, upperCase: false, specialChars: false},seed);
        const actonFor='reset'

        const otpPayload={email,otp,actonFor};

        //create entry for otp
        const otpBody=await OTP.create(otpPayload);

        res.status(200).json({
            success:true,
            message:'otp sent successfully',
            otp
        })

        // Call the next middleware function in the chain.
        next();
    }catch (error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })

    }
};