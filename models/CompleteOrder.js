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
    Price: Number,
})

module.exports = mongoose.model("CompleteOrders", CompleteOrderSchema);