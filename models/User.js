const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    timestamp: String,
    waId:String,
    waName:String,
    userName:String,
    userMobile:String,
})

module.exports = mongoose.model("user", UserSchema);