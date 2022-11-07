import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { OrderModelPage1, ProductModel } from "./usermodels.js"

const uri = "mongodb+srv://admin:2Sr3!sL^r4wX@cluster0.kemmroz.mongodb.net/database?retryWrites=true&w=majority"
mongoose.connect(uri)


const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 9000

// Orders APIs
app.post("/api/send/order/1", (req, res) => {
    const message = req.body
    console.log(req.body)
    OrderModelPage1.create(message, (err, data) => {
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