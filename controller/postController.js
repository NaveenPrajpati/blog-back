const postModel = require("../models/postModel");
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const mongoose = require("mongoose");
require("dotenv").config()

// Configuration


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
            console.log(error)
        console.log("error occur in contoller");
        
    }  
}


exports.addPost=async(req,res)=>{
    try {

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
               imagePath=res.url.slice()
               pubId=res.public_id;
           })
           .catch(err=>console.log(err));

       //delete tmp file
        fs.unlink(file.tempFilePath, (err) => {
            if (err) {
                console.error(err);
            }
        });


        // postm.save(creator,title,tags,message,imageFile:data)
        const post= await postModel.create({creator,creatorId,title,tags,message,publicId:pubId,imageFile:imagePath})
        res.status(201).json(post);
    } catch (error) {
        console.log(error)
        console.log('error occured in save post controller')
    }  
}

exports.deletePost=async(req,res)=>{
    try {
       const ids= await postModel.findByIdAndDelete(req.params.id)

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
        if (!mongoose.Types.ObjectId.isValid(req.body._id))
            return res.status(404).send(`No post with id `);

        console.log(req.body)
        const ids=await postModel.findByIdAndUpdate(req.body._id,req.body,{new:true})

        res.status(200).json(ids)

        } catch (error) {
        res.status(404).json({
            message:'no post found with id'
        })
        }
}

exports.updateLike=async(req,res)=>{
    try {
        if (!req.user.id) {
            return res.json({ message: "Unauthenticated" });
        }

        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send(`No post with this id`);

        const post=await postModel.findById(req.params.id);
        const index=post.likes.findIndex((id)=>{return (id===req.user.id)})
     
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