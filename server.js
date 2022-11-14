// import express from "express"
// import cors from "cors"
// import mongoose from "mongoose"
// import { OrderModelPage1 } from "./models/usermodels"
// import { v4 as uuidv4 } from 'uuid';
import Razorpay from "razorpay"
import shortid from "shortid"
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const OrdersAPI = require("./routes/Orders")


const uri = "mongodb+srv://admin:2Sr3!sL^r4wX@cluster0.kemmroz.mongodb.net/database?retryWrites=true&w=majority"
// mongoose.connect(uri)

mongoose.connection.once("open", () => console.log("connected")).on("error", (e) => console.log(`Error : ${e}`))

const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 9000

const razorpayInstance = new Razorpay({ key_id: 'rzp_live_LGQWlNB1DMOVwJ', key_secret: 'U4huXcpQQtYOZlDskDnUCTeV' })
app.post('/razorpay', async(req, res) => {

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
    try{
        const response = await razorpayInstance.orders.create(options)
        console.log(response)
        res.send(response)
    }catch(error){
        console.log(error)
        res.send(error)
    }
})

app.use("/api/send/order", OrdersAPI)


app.listen(port, () => { console.log(`Listen on port ${port}`) })
