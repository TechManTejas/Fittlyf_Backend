const express = require('express')
const router = express.Router()
const { uuid } = require('uuidv4');
const OrderPage = require("../models/OrderPage")

router.get("/test", (req, res) => {
    res.status(200).send("Working")
})


router.post("/1", (req, res) => {
    let message = req.body
    message = { ...message, date: new Date(), id: uuid(), mode: null, shippingSame: null }
    console.log(message)
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
    console.log(message)
    OrderPage.findOneAndUpdate({ id: message.id }, { mode : message.mode }).then(() => {
        console.log("success")
        res.status(200).send({ code: "success" })
    })
})

router.post("/3", (req, res) => {
    let message = req.body
    console.log(message)
    OrderPage.findOneAndUpdate({ id: message.id }, { shippingSame: message.shippingSame }).then(() => {
        console.log("success")
        res.status(200).send({ code: "success" })
    })
})

module.exports = router