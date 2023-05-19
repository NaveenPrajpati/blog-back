
const commentModel = require("../models/commentModel");
const postModel = require("../models/postModel");


exports.addComment=async(req,res)=>{
    try {
        console.log(req.body)
        const {id,comment}=req.body
        const po=await postModel.findById(id);

            po.comments.push(req.user.name+" "+comment)

         const ids=await postModel.findByIdAndUpdate(id,po,{new:true});

         res.status(200).json(ids)
    } catch (error) {
        console.log(error)
        console.log('error occured in save post controller')
    }
}


// exports.getComments=async(req,res)=>{
//     try {
//         console.log('print start')
//
//         const po= await commentModel.find()
//         console.log('print')
//         console.log('comment ',po)
//         res.status(200).json(po);
//     } catch (error) {
//         console.log(error)
//         console.log('error occured in save post controller')
//     }
// }