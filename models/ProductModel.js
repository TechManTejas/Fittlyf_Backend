const mongoose = require("mongoose")

export const ProductModel = mongoose.Schema({
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
})

module.exports = mongoose.model("product", ProductModel);