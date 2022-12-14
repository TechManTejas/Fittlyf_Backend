const express = require('express')
const router = express.Router()
const Razorpay = require('razorpay'); 
const { uuid } = require('uuidv4');
const Orders = require("../models/Order")
const Products = require('../models/Product')

// const razorpayInstance = new Razorpay({ key_id: 'rzp_live_N1vLKkvguKjZGT', key_secret: 'fw1xS3zQQ3AfMH8ZxNhbyk7q' })
const razorpayInstance = new Razorpay({ key_id: 'rzp_test_WPA6J9hOSf3nLT', key_secret: 'kbAgn3XNsq1Gwp4nvPavVlBu' })

router.post('/', async (req, res) => {

    console.log(req.body.id)
    var mongoData;
    await Orders.findOne({ id: req.body.id }, function (err, data) {
        mongoData = data
        console.log(mongoData)
    }).clone().then((mongoData) => {
        Products.findOne({ sku: mongoData.sku}, async function (err, data) {
            const amount = data.pack.price;
            const currency = 'INR'
            const options = {
                amount: amount * 100,
                currency: currency,
                receipt: uuid(),
                notes: {
                    key1: "value3",
                    key2: "value2"
                }
            }    
            try {
                const response = await razorpayInstance.orders.create(options)
                console.log("Razorpay")
                console.log(response)
                res.send(response)
            } catch (error) {
                console.log(error)
                res.send(error)
            }
        })
    })

    // const amount = 1;
    // const currency = 'INR'

    // const options = {
    //     amount: amount * 100,
    //     currency: currency,
    //     receipt: uuid(),
    //     notes: {
    //         key1: "value3",
    //         key2: "value2"
    //     }
    // }
    // try {
    //     const response = await razorpayInstance.orders.create(options)
    //     console.log("Razorpay")
    //     console.log(response)
    //     res.send(response)
    // } catch (error) {
    //     console.log(error)
    //     res.send(error)
    // }
})

module.exports = router