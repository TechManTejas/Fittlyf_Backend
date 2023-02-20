const express = require('express')
const router = express.Router()
const axios = require('axios')
const User = require('../models/User')

router.post("/otpless", (req, res) => {

    var data = req.body

    console.log(data)

    axios.post(
        "https://fittlyf.authlink.me/",
        data,
        {
            headers:{
                'Content-Type': 'application/json',
                'clientSecret': 'iyyfgsz1cfe74gmy',
                'clientId':'pqirooh0'
            }
        }
    ).then(({data}) => {
        console.log(data);
        
        User.create({
            timestamp : data.data.timestamp,
            waId : data.user.waId,
            waName: data.user.waName,
            userName : data.data.userName,
            userMobile : data.data.userMobile
        }, (err, data) => {
            if (err) {
                res.status(500).send("error")
            }
            else {
                res.status(200).send(data)
            }
        })
        //save to database
        // timestamp: String,
        // waId:String,
        // waName:String,
        // userName:String,
        // userMobile:String,
       
    })
    
    // User.create(req.body, (err, data) => {
    //     if (err) {
    //         res.status(500).send("error")
    //     }
    //     else {
    //         res.status(200).send(data)
    //     }
    // })
})

router.post("/otp", (req, res) => {
    
    const data = req.body
    console.log(data)

    User.create(data, (err, data) => {
        if (err) {
            res.status(500).send("error")
        }
        else {
            res.status(200).send(data)
        }
    })

})

module.exports = router