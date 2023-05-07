const mongoose=require("mongoose");


//route handler
const postSchema=new mongoose.Schema({
	title:{type: String,required:true,default:'null'},
	message:{type: String,required:[true,"please enter author"]},
	creator:String,
	tags:[String],
	imageFile:String,
	likes:{type:Number,default:0},
	createdAt:{type:Date,default:new Date()}

}
);
module.exports=mongoose.model("post",postSchema);