const mongoose = require("mongoose")

export const ProductModel = mongoose.Schema({
    sku: String,
    pack: {
        duration: Number,
        price: Number,
        noOfBottles: Number,
        noOfTables: Number,
        expiry: Number,
    }
})

module.exports = mongoose.model("product", ProductModel);