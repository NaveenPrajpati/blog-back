const mongoose = require("mongoose");


//route handler
const profileSchema = new mongoose.Schema({
        profilePic: {type: String},
        hobby: [{type: String}],
        gender: {type: String}
    }
)

module.exports = mongoose.model("profile",profileSchema);