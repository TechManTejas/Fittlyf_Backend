const express = require("express")
const cors = require("cors")
const https = require("https")
const path = require("path")
const fs = require("fs")
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

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
},app)

sslServer.listen(port, () => { console.log(`Secure server listening on ${port}`) })
