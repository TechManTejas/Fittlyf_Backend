const express = require('express')
const router = express.Router()
const axios = require("axios")
const OrderPage = require("../models/Order")

router.post("/", (req, res) => {
    let message = req.body
    let id = message.id

    OrderPage.findOne({ id: id }, function (err, data) {
        var mongoData = data
    }).clone().then(() => {
        var bearerToken;
        var urlGetToken = "https://apiv2.shiprocket.in/v1/external/auth/login/"
        var urlCreateOrder = "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc/"
        var userCredentials = {
            "email": "fittlyf2020@gmail.com",
            "password": "asdfASDF1234!@#$"
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

        axios.post(urlGetToken, userCredentials).then((data) => {
            bearerToken = data.data.token

            axios.post(urlCreateOrder, orderData, {
                headers: { 'Authorization': `Bearer ${bearerToken}` }
            }).then((data) => {
                console.log(data);
                res.status(200).send({ code: 'success' });
            }).catch((error) => {
                console.log(error);
                res.status(500).send(error.message);
            })
        }).catch((error) => {
            res.status(500).send(error.message)
        })
    })
})

module.exports = router