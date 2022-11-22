const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const OrdersAPI = require("./routes/Orders")
const RazorpayPaymentGatewayAPI = require("./routes/RazorpayPaymentGateway")
const ShipRocketOrdersAPI = require("./routes/ShipRocketOrders")
const CompleteOrderAPI = require("./routes/CompleteOrder")

const uri = "mongodb+srv://admin:2Sr3!sL^r4wX@cluster0.kemmroz.mongodb.net/database?retryWrites=true&w=majority"
mongoose.connect(uri)

mongoose.connection.once("open", () => console.log("connected")).on("error", (e) => console.log(`Error : ${e}`))

const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 9000

app.use("/api/send/order", OrdersAPI)
app.use("/razorpay", RazorpayPaymentGatewayAPI)
app.use("/placeorder", ShipRocketOrdersAPI)
app.use("/orders", CompleteOrderAPI)

app.listen(port, () => { console.log(`Listen on port ${port}`) })
