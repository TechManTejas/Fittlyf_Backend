const express = require('express')
const router = express.Router()
const Webinar = require('../models/Webinar')

router.post("/post", (req, res) => {
    console.log(req.body)
    Webinar.create(req.body, (err, data) => {
        if (err) {
            res.status(500).send("error")
        }
        else {
            res.status(200).send(data)
        }
    })
})

module.exports = router