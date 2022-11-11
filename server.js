import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { OrderModelPage1 } from "./usermodels.js"
import { v4 as uuidv4 } from 'uuid';


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
    console.log(message)
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
    OrderModelPage1.findOneAndUpdate({ id: message.id }, { mode : message.mode }).then(() => {
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



app.listen(port, () => { console.log(`Listen on port ${port}`) })
