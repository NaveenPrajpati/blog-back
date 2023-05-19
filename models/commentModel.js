const mongoose=require('mongoose')


const commentSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    post:{type:mongoose.Schema.Types.ObjectId,ref:'post'},
    comment:{type:String,default:'no comment'}
})

module.exports=mongoose.model('comment',commentSchema);