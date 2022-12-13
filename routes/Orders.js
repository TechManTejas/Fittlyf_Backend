const express = require('express')
const router = express.Router()
const { uuid } = require('uuidv4');
const OrderPage = require("../models/Order")

router.post("/1", (req, res) => {
    let message = req.body
    console.log(message)
    message = {
        ...message, date: new Date(), id: uuid(), cod: null, shippingSame: null, razorpay_order_id: null,
        razorpay_payment_id: null,
        razorpay_signature: null
    }
    OrderPage.create(message, (err, data) => {
        if (err) {
            res.status(500).send("error")
        }
        else {
            console.log("success")
            res.status(200).send({ code: "success", data: { data } })
        }
    })
})


router.post("/2", (req, res) => {
    let message = req.body
    OrderPage.findOneAndUpdate({ id: message.id }, { cod: message.cod }).then(() => {
        console.log("success")
        res.status(200).send({ code: "success" })
    })
})


router.post("/3", (req, res) => {
    let message = req.body
    OrderPage.findOneAndUpdate({ id: message.id }, { shippingSame: message.shippingSame }).then(() => {
        console.log("success")
        res.status(200).send({ code: "success" })
    })
})

router.post("/payment", (req, res) => {
    let message = req.body
    OrderPage.findOneAndUpdate({ id: message.id }, {
        razorpay_order_id: message.razorpay_order_id,
        razorpay_payment_id: message.razorpay_payment_id,
        razorpay_signature: message.razorpay_signature
    }).then(() => {
        console.log("success")
        res.status(200).send({ code: "success" })
    })
})

module.exports = router