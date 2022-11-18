const express = require('express')
const router = express.Router()
const Razorpay = require('razorpay'); 
const { uuid } = require('uuidv4');

const razorpayInstance = new Razorpay({ key_id: 'rzp_test_WPA6J9hOSf3nLT', key_secret: 'kbAgn3XNsq1Gwp4nvPavVlBu' })
router.post('/', async (req, res) => {

    const amount = 1;
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
        console.log(response)
        res.send(response)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

module.exports = router