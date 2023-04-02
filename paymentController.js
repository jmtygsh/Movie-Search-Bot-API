const Razorpay = require('razorpay');
var crypto = require("crypto");
require('dotenv').config()
const key = process.env.KEY_ID;
const secret = process.env.SECRET_KEY;


module.exports.orders = (req, res) => {
    let instance = new Razorpay({ key_id: key, key_secret: secret })

    var options = {
        amount: req.body.amount * 100,  // amount in the smallest currency unit
        currency: "INR",
    };
    instance.orders.create(options, function (err, order) {
        if (err) {
            return res.send({ code: 500, message: "server error" })
        }
        return res.send({ code: 200, message: 'order created', data: order })
    });

}


module.exports.verify = (req, res) => {

    let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

    expectedSignature = crypto.createHmac('sha256', secret)
        .update(body.toString())
        .digest('hex');


    if (expectedSignature === req.body.response.razorpay_signature) {
        res.send({ code: 200, message: 'Signature valid' });
    }
    else {

        res.send({ code: 500, message: 'Signature Invalid' });
    }


}
