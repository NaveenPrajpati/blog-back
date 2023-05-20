const cloudinary = require('cloudinary').v2;
require("dotenv").config()

const cloudinaryConf=()=> cloudinary.config({
    cloud_name: "dd07mszqg",
    api_key:process.env.CLOUDNARY_API_KEY,
    api_secret:process.env.CLOUDNARY_API_SECRET
});
module.exports=cloudinaryConf