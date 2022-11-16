import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { OrderModelPage1 } from "./usermodels.js"
import { v4 as uuidv4 } from 'uuid';
import Razorpay from "razorpay"
import shortid from "shortid"
import axios from 'axios'

const uri = "mongodb+srv://admin:2Sr3!sL^r4wX@cluster0.kemmroz.mongodb.net/database?retryWrites=true&w=majority"
mongoose.connect(uri)

mongoose.connection.once("open", () => console.log("connected")).on("error", (e) => console.log(`Error : ${e}`))

const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 9000


app.get("/test", (req, res) => {
    res.status(200).send("Tested Success!!!!")
})

// Orders APIs
app.post("/api/send/order/1", (req, res) => {
    let message = req.body
    message = { ...message, date: new Date(), id: uuidv4(), mode: null, shippingSame: null }
    OrderModelPage1.create(message, (err, data) => {
        if (err) {
            res.status(500).send("error")
        }
        else {
            console.log("success")
            res.status(200).send({ code: "success", data: { data } })
        }
    })
})

app.post("/api/send/order/2", (req, res) => {
    let message = req.body
    console.log(message)
    OrderModelPage1.findOneAndUpdate({ id: message.id }, { mode: message.mode }).then(() => {
        console.log("success")
        res.status(200).send({ code: "success" })
    })
})

app.post("/api/send/order/3", (req, res) => {
    let message = req.body
    console.log(message)
    OrderModelPage1.findOneAndUpdate({ id: message.id }, { shippingSame: message.shippingSame }).then(() => {
        console.log("success")
        res.status(200).send({ code: "success" })
    })
})

app.post("/placeorder", (req, res) => {
    let message = req.body
    let id = message.id

    var mongoData;
    OrderModelPage1.findOne({ id: id }, function (err, data) {
        mongoData = data
    }).clone().then(() => {
        var bearerToken;
        var urlGetToken = "https://apiv2.shiprocket.in/v1/external/auth/login/"
        var urlCreateOrder = "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc/"
        var userCredentials = {
            "email": "vaijtejas23@gmail.com",
            "password": "tech234man@TEJAS"
            // "email": "fittlyf2020@gmail.com",
            // "password": "asdfASDF1234!@#$"
        }
        var orderData = {
            "order_id": id,
            "order_date": "2022-07-24 11:11", // to be done
            "pickup_location": "Primary",
            "channel_id": "",
            "comment": "",
            "reseller_name": "",
            "company_name": "Fittlyf",
            "billing_customer_name": mongoData.firstName,
            "billing_last_name": mongoData.lastName,
            "billing_address": mongoData.address,
            "billing_address_2": mongoData.apartmentAndOthers,
            "billing_isd_code": "",
            "billing_city": mongoData.city,
            "billing_pincode": mongoData.zip,
            "billing_state": mongoData.state,
            "billing_country": "India",
            "billing_email": mongoData.emailPhoneNumber,
            "billing_phone": "9876543210",
            "billing_alternate_phone": "",
            "shipping_is_billing": true,
            "shipping_customer_name": "",
            "shipping_last_name": "",
            "shipping_address": "",
            "shipping_address_2": "",
            "shipping_city": "",
            "shipping_pincode": "",
            "shipping_country": "",
            "shipping_state": "",
            "shipping_email": "",
            "shipping_phone": "",
            "order_items": [
                {
                    "name": "Yosha",
                    "sku": `yoshapack${mongoData.noOfTablets}`,
                    "units": 1,
                    "selling_price": mongoData.Price,
                    "discount": "",
                    "tax": "",
                    "hsn": 441122
                }
            ],
            "payment_method": "Prepaid",
            "shipping_charges": 0,
            "giftwrap_charges": 0,
            "transaction_charges": 0,
            "total_discount": 0,
            "sub_total": mongoData.Price,
            "length": 10,
            "breadth": 15,
            "height": 20,
            "weight": 2.5,
            "ewaybill_no": "",
            "customer_gstin": "",
            "invoice_number": "",
            "order_type": ""
        }

        console.log(orderData)

        axios.post(urlGetToken, userCredentials).then((data) => {
            bearerToken = data.data.token
            console.log(bearerToken)

            axios.post(urlCreateOrder, orderData, {
                headers: { 'Authorization': `Bearer ${bearerToken}` }
            }).then((data) => {
                console.log(data);
                res.status(200).send({code: 'success'});
            }).catch((error) => {
                console.log(error);
                res.status(500).send(error.message);
            })
        }).catch((error) => {
            res.status(500).send(error.message)
        })
    })



    console.log("HERE")
})

const razorpayInstance = new Razorpay({ key_id: 'rzp_live_N1vLKkvguKjZGT', key_secret: 'fw1xS3zQQ3AfMH8ZxNhbyk7q' })
app.post('/razorpay', async (req, res) => {

    const amount = 1;
    const currency = 'INR'

    const options = {
        amount: amount * 100,
        currency: currency,
        receipt: shortid.generate(),
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




app.listen(port, () => { console.log(`Listen on port ${port}`) })
