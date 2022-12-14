const mongoose = require("mongoose")

const OrderSchema = mongoose.Schema({
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
    Price: Number,
    sku: String,
    cod: Boolean,
    shippingSame: Boolean,
    PhoneNumber: Number,
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
    ShippingCountry: String,
    ShippingAddress: String,
    ShippingCity: String,
    ShippingState: String,
    ShippingPin: String,
    ShippingOtherAddress: String,
})

module.exports = mongoose.model("orders", OrderSchema);