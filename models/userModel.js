const mongoose = require("mongoose");


//route handler
const userSchema = new mongoose.Schema({
        username: {type: String, required: [true, "enter user name"]},
        email: {type: String, required: [true, "enter email"], unique: [true, "email taken"]},
        password: {type: String, required: [true, "enter password"],}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("user", userSchema);