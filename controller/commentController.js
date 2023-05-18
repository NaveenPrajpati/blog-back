
const commentModel = require("../models/commentModel");


exports.addComment=async(req,res)=>{
    try {
        console.log(req.body)
        const {user,post,comment}=req.body

        const po= await commentModel.create({user,post,comment})
        // console.log(post)
        res.status(201).json(post);
    } catch (error) {
        console.log(error)
        console.log('error occured in save post controller')
    }
}