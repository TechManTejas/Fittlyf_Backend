const mongoose = require("mongoose")

const CompleteOrderSchema = mongoose.Schema({
    id : String,
    orderID : String,
    emailPhoneNumber: String,
    address: String,
    cod: Boolean,
    country: String,
    firstName: String,
    lastName: String,
    apartmentAndOthers: String,
    city: String,
    state: String,
    zip: Number,
    PhoneNumber : Number,
    price: Number,
    sku: String,
    ShippingCountry: String,
    ShippingAddress: String,
    ShippingCity: String,
    ShippingState: String,
    ShippingPin: String,
    ShippingOtherAddress: String,
})

module.exports = mongoose.model("CompleteOrders", CompleteOrderSchema);