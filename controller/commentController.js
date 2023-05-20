
const commentModel = require("../models/commentModel");
const postModel = require("../models/postModel");


exports.addComment=async(req,res)=>{
    try {
        const {id,comment}=req.body
        const po=await postModel.findById(id);

            po.comments.push(req.user.name+":- "+comment)

         const ids=await postModel.findByIdAndUpdate(id,po,{new:true});

         res.status(200).json(ids)
    } catch (error) {
        console.log(error)
        console.log('error occured in save post controller')
    }
}
