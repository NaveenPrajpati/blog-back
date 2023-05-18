const mongoose=require("mongoose");


//route handler
const postSchema=new mongoose.Schema({
	title:{type: String,required:true,default:'null'},
	message:{type: String,required:[true,"please enter author"]},
	creator:String,
		creatorId:String,
		tags:[String],
	publicId:String,
	imageFile:String,
	likes:[{type:String,default:[]}],
	comments:[{type:mongoose.Schema.Types.ObjectId,ref:'comment'}],
	createdAt:{type:Date,default:Date.now}

}
);
module.exports=mongoose.model("post",postSchema);