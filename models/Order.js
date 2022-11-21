const mongoose = require("mongoose")

const OrderModelPage1 = mongoose.Schema({
    id: String,
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
    utc: Date,
    duration: String,
    noOfBottles: Number,
    noOfTablets: Number,
    Price: Number,
    cod: Boolean,
    shippingSame: Boolean,
    packNumber: Number,
    PhoneNumber: Number,
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String
})

module.exports = mongoose.model("orders", OrderModelPage1);