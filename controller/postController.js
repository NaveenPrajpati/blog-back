const postModel = require("../models/postModel");
const cloudinary = require('cloudinary').v2;

// Configuration
cloudinary.config({
    cloud_name: "dd07mszqg",
    api_key: "642427667313868",
    api_secret: "3_ut3MmLyqtTPKsWF5uzOwSNgxE"
});

exports.getAllcont=async(req,res)=>{
        try {
          const dat=await postModel.find({});
        res.status(200).json(dat);
    } catch (error) {
        console.log("error occur in contoller")
    }  
}
exports.getbookId=async(req,res)=>{
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
        const {creator,title,tags,message}=req.body
        const file=req.files.selectedFile

        // Get the original file extension
        const extension = file.name.substring(file.name.lastIndexOf('.'));

        // Generate a new file name
        const newFileName = Date.now()+"-"+file.name;

       const path='uploads/' + newFileName
        // Move the uploaded file to a new location with a new name
        file.mv(path, function(err) {
           if (err) {
               console.log(err);
               return res.status(500).send('Error occurred while uploading file');
           }
       });

        let imagePath;
       await cloudinary.uploader.upload(path,{folder:"entry",use_filename:true})
           .then(res=> {
                console.log(res)
               imagePath=res.url.slice()
           })
           .catch(err=>console.log(err))

        console.log(imagePath)
       
            // postm.save(creator,title,tags,message,imageFile:data)
        const post= await postModel.create({creator,title,tags,message,imageFile:imagePath})
        console.log(post)
        res.status(201).json(post);
    } catch (error) {
        console.log('error occured in save post controller')
    }  
}

exports.deletebook=async(req,res)=>{
    try {
        await postModel.findByIdAndDelete(req.params.id)
        res.status(200).send("delete successfull")
    } catch (error) {
        console.log('error occured in controller')    
    }
}

exports.updatebook=async(req,res)=>{
    try {
        const ids=await postModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
            res.json(ids)

        } catch (error) {
                console.log("error occured in controller")
        }
}