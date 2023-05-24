const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");


//route handler
const userSchema = new mongoose.Schema({
        firstName: {type: String, required: [true, "enter user name"]},
        lastName: {type: String, required: [true, "enter user name"]},
        email: {type: String, required: [true, "enter email"], unique: [true, "email taken"]},
       userType:{type:String,default:'public'},
        password: {type: String, required: [true, "enter password"],},
    additionalDetails:{type:mongoose.Schema.Types.ObjectId,ref:'profile'}

    },
    {
        timestamps: true
    }
)

userSchema.post('findOneAndUpdate',async function (doc){


        console.log('sending mail')
        console.log(doc)
        await mailSender(doc.email,"conformation mail",'change success')
            .then(res=>{
                console.log(res)
                console.log('mail sent to- '+doc.email)
            })
            .catch(error=>{
            console.log("error occur while sending mail",error);
            throw error;
        })



})

module.exports = mongoose.model("user", userSchema);