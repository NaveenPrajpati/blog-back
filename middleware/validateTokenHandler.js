const asyncHandler = require('express-async-handler');
var jwt = require('jsonwebtoken');

const validateToken=asyncHandler(async(req,res,next)=>{
    let token;
    let  authHeader=req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token =authHeader.split(" ")[1];

        //verify token
        jwt.verify(token,process.env.ACCESS_TOKEN_SECREC,(error,decoded)=>{
            if(error){
                console.log(error)
                res.status(401);
                throw new Error("user is not authorized")
            }
            // console.log(decoded)
            req.user=decoded.user;
            next();
        });
        if(!token){
            res.status(401);
            throw new Error("user is not authorized or token missing")
        }
    }
})

module.exports=validateToken;