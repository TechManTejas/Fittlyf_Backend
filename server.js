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
var corsOptions = {
    origin: 'https://www.fittlyf.com/',
    optionsSuccessStatus: 200,
    methods: "GET, POST, PUT" 
}
app.use(cors(corsOptions))
const port = process.env.PORT || 443

app.use("/api/send/order", OrdersAPI)
app.use("/razorpay", RazorpayPaymentGatewayAPI)
app.use("/placeorder", ShipRocketOrdersAPI)
app.use("/orders", CompleteOrderAPI)
app.use("/.well-known/pki-validation/3DB3A57CFC3B60CCB59B1EEABF97BAB4.txt", (req, res) => {
    res.sendFile(path.join(__dirname,'' ,'3DB3A57CFC3B60CCB59B1EEABF97BAB4.txt'))
})

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'fittlyf.crt')),
    ca: fs.readFileSync(path.join(__dirname, 'cert', 'gd_bundle-g2-g1.crt'))
},app)

sslServer.listen(port, () => { console.log(`Secure server listening on ${port}`) })
