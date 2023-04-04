const express = require('express')
const router = express.Router()
const axios = require("axios")
const OrderPage = require("../models/Order")
const Products = require('../models/Product')

router.post("/", async (req, res) => {
    let message = req.body
    let id = message.id
    let mongoData;

    await OrderPage.findOne({ id: id },async function (err, data) {
        mongoData = data
        Products.findOne({ sku: mongoData.sku }, function (err, data) {
            mongoData['Price'] = data.pack.price;
            // console.log(mongoData)
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
                "order_date": "2023-04-04 11:11", // to be done
                "pickup_location": "Bangalore",
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
                "billing_phone": mongoData.PhoneNumber,
                "billing_alternate_phone": "",
                "shipping_is_billing": mongoData.shippingSame,
                "shipping_customer_name": mongoData.firstName,
                "shipping_last_name": mongoData.lastName,
                "shipping_address": mongoData.shippingSame ? "" : mongoData.ShippingAddress,
                "shipping_address_2": mongoData.shippingSame ? "" : mongoData.ShippingOtherAddress,
                "shipping_city": mongoData.shippingSame ? "" : mongoData.ShippingCity,
                "shipping_pincode": mongoData.shippingSame ? "" : parseInt(mongoData.ShippingPin),
                "shipping_country": mongoData.shippingSame ? "" : mongoData.ShippingCountry,
                "shipping_state": mongoData.shippingSame ? "" : mongoData.ShippingState,
                "shipping_email": mongoData.emailPhoneNumber,
                "shipping_phone": mongoData.PhoneNumber,
                "order_items": [
                    {
                        "name": "Yosha",
                        "sku": mongoData.sku,
                        "units": 1,
                        "selling_price": mongoData.Price,
                        "discount": "",
                        "tax": "",
                        "hsn": 441122
                    }
                ],
                "payment_method": mongoData.cod ? "COD" : "Prepaid" ,
                "shipping_charges": 0,
                "giftwrap_charges": 0,
                "transaction_charges": 0,
                "total_discount": 0,
                "sub_total": mongoData.Price,
                "length": 10,
                "breadth": 20,
                "height": 10,
                "weight": 0.300,
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
                    // console.log(data);
                    res.status(200).send({ code: 'success' });
                }).catch((error) => {
                    // console.log(error.response);
                    res.status(500).send(error.message);
                })
            }).catch((error) => {
                res.status(500).send(error.message)
            })
        })
    }).clone().catch((error) => {
        res.status(500).send(error.message);
    })
})

module.exports = router