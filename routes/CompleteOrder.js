const express = require('express')
const router = express.Router()
const { uuid } = require('uuidv4');
const CompleteOrder = require('../models/CompleteOrder')

router.get("/get", (req, res) => {
    let message = req.body
    // console.log(message)
    CompleteOrder.findOne({ orderID: message.id }, (err, data) => {
        // console.log(data)
        if (err) {
            res.status(500).send(err)
        }
        else if(data == null) {
            res.status(204).send("")
        }
        else res.status(200).send(data)
    })
})

router.post("/set", (req, res) => {
    let message = req.body
    message = { ...message, orderID: uuid() };
    console.log(message)
    CompleteOrder.create(message, (err, data) => {
        if (err) {
            res.status(500).send("error")
        }
        else {
            console.log("success")
            res.status(200).send({ code: "success", data: { data } })
        }
    })
})

module.exports = router