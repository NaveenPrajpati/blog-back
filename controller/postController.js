const postModel = require("../models/postModel");
const cloudinary = require('cloudinary').v2;
require("dotenv").config()

// Configuration
cloudinary.config({
    cloud_name: "dd07mszqg",
    api_key:process.env.CLOUDNARY_API_KEY,
    api_secret:process.env.CLOUDNARY_API_SECRET
});

exports.getAllPost=async(req,res)=>{
        try {
          const dat=await postModel.find();
        res.status(200).json(dat);
    } catch (error) {
        console.log("error occur in getAll contoller")
    }  
}
exports.getPostId=async(req,res)=>{
        try {
          const dat=await postModel.findById(req.params.id)
        res.status(200).json(dat);
    } catch (error) {
        console.log("error occur in contoller");
        
    }  
}
exports.getbookName=async(req,res)=>{
        try {
          const dat=await postModel.find({title:req.params.name}) 
        res.status(200).json(dat);
    } catch (error) {
        console.log("error occur in contoller")
        res.send("name not found")
    }  
}
exports.getbookAuthor=async(req,res)=>{
        try {
          const dat=await postModel.find({author:req.params.name}) 
        res.status(200).json(dat);
    } catch (error) {
        console.log("error occur in contoller")
        res.send("name not found")
    }  
}

exports.addPost=async(req,res)=>{
    try {
        console.log(req.body)
        console.log(req.files.selectedFile)
        const {creator,creatorId,title,tags,message}=req.body
        const file=req.files.selectedFile

        // Get the original file extension
        const extension = file.name.substring(file.name.lastIndexOf('.'));

        // Generate a new file name
        const newFileName = Date.now()+"-"+file.name;

       const path='uploads/' + newFileName
        // Move the uploaded file to a new location with a new name
       //  file.mv(path, function(err) {
       //     if (err) {
       //         console.log(err);
       //         return res.status(500).send('Error occurred while uploading file');
       //     }
       // });

        let imagePath;
       let pubId;
       await cloudinary.uploader.upload(file.tempFilePath,{folder:'entry'})
           .then(res=> {
                console.log(res)
               imagePath=res.url.slice()
               pubId=res.public_id;
           })
           .catch(err=>console.log(err));

       
            // postm.save(creator,title,tags,message,imageFile:data)
        const post= await postModel.create({creator,creatorId,title,tags,message,publicId:pubId,imageFile:imagePath})
        // console.log(post)
        res.status(201).json(post);
    } catch (error) {
        console.log(error)
        console.log('error occured in save post controller')
    }  
}

exports.deletePost=async(req,res)=>{
    try {


       const ids= await postModel.findByIdAndDelete(req.params.id)
        console.log(ids.publicId)


       await cloudinary.uploader
            .destroy(ids.publicId)
            .then(result=>console.log(result))



        res.status(200).json(ids)
    } catch (error) {
        console.log('error occured in controller')    
    }
}

exports.updatePost=async(req,res)=>{
    try {
        console.log(req.body)
        const ids=await postModel.findByIdAndUpdate(req.body._id,req.body,{new:true});
        console.log(ids)

        res.status(200).json(ids)

        } catch (error) {
                console.log("error occured in controller")
        }
}

exports.updateLike=async(req,res)=>{
    try {
       
        const post=await postModel.findById(req.params.id);
        const index=post.likes.findIndex((id)=>{return (id==req.user.id)})
     
        if(index=== -1)
        post.likes.push(req.user.id)
        else
        post.likes=post.likes.filter((id)=>id!==String(req.user.id))
     
        const ids=await postModel.findByIdAndUpdate(req.params.id,post,{new:true});
        res.status(200).json(ids)

    } catch (error) {
        console.log("error occured in controller")
    }
}