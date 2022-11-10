import mongoose from "mongoose";

export const ProductModel = mongoose.model("product", mongoose.Schema({
    title: String,
    price: Number,
    MRP: Number,
    vendor: String,
    available: Number,
    desciption: [{
        type: String
    }],
    pack: [{
        duration: String,
        price: Number,
        noOfBottles: Number,
        noOfTables: Number
    }]
}))

export const OrderModelPage1 = mongoose.model("orderpage1", mongoose.Schema({
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
    Price : Number
}))

export const OrderModelPage2 = mongoose.model("orderpage2", mongoose.Schema({
    cashOnDelivery: Boolean,
    date : Date
}))

export const OrderModelPage3 = mongoose.model("orderpage3", mongoose.Schema({
    sameAsShipping: Boolean,
    date : Date
}))




// export { mongoose.model("products", ProductSchema), mongoose.model("order", mongoose.Schema({}) ) }
