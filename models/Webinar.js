const mongoose = require("mongoose")

const WebinarSchema = mongoose.Schema({
    name : String,
    phoneNumber : Number,
    city : String,
    email : String
})

module.exports = mongoose.model("webinar", WebinarSchema);