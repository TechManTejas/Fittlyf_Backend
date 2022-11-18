const mongoose = require("mongoose")

const OrderModelPage1 = mongoose.Schema({
    id : String,
    emailPhoneNumber: String,
    emailMe: Boolean,
    country: String,
    firstName: String,
    lastName: String,
    address: String,
    apartmentAndOthers: String,
    city: String,
    state: String,
    zip: Number,
    saveThis: Boolean,
    utc : Date,
    duration : String,
    noOfBottles : Number,
    noOfTablets : Number,
    Price : Number,
    mode : Boolean,
    shippingSame : Boolean,
    packNumber : Number,
    PhoneNumber : Number
})

module.exports = mongoose.model("orderpage1", OrderModelPage1);