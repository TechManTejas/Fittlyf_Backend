import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { OrderModelPage1, OrderModelPage2, OrderModelPage3, ProductModel } from "./usermodels.js"

const uri = "mongodb+srv://admin:2Sr3!sL^r4wX@cluster0.kemmroz.mongodb.net/database?retryWrites=true&w=majority"
mongoose.connect(uri)

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
    message = { ...message, date: new Date() }
    console.log(message)
    OrderModelPage1.create(message, (err, data) => {
        if (err) {
            res.status(500).send("error")
        }
        else {
            console.log("success")
            res.status(200).send("success")
        }
    })
})



app.post("/api/send/order/2", (req, res) => {
    let message = req.body
    message = { ...message, date: new Date() }
    console.log(message)
    OrderModelPage2.create(message, (err, data) => {
        if (err) {
            res.status(500).send("error")
        }
        else {
            res.status(200).send("success")
        }
    })
})

app.post("/api/send/order/3", (req, res) => {
    let message = req.body
    message = { ...message, date: new Date() }
    console.log(message)
    OrderModelPage3.create(message, (err, data) => {
        if (err) {
            res.status(500).send("error")
        }
        else {
            res.status(200).send("success")
        }
    })
})

// app.post('/addproduct', (req, res) => {  
//     const message = req.body
//     ProductModel.create(message, (err, data) => {
//         if (err) {
//             res.status(500).send(err)
//         }
//         else {
//             res.status(200).send(data)
//         }
//     })
// })

// app.get('/getproduct', (req, res) => {
//     ProductModel.find({}, (err, data) => {
//         if (err) {
//             res.status(500).send(err)
//         }
//         else {
//             res.status(200).send(data)
//         }
//     })
// })

app.listen(port, () => { console.log(`Listen on port ${port}`) })
