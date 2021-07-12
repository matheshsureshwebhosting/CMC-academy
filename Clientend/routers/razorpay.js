const router = require("express").Router()
const Razorpay = require("razorpay")

var instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
});

router.post('/payment', async (req, res) => {
    const { clientuserid } = req.headers
    const { amount } = req.body    
    if (!clientuserid) return res.send("Userid Must")    
    var params = await {
        amount: Number(amount) * 100,
        currency: "INR",
        receipt: "su001",
        payment_capture: '1'
    };  
   await instance.orders.create(params).then((data) => {        
        return res.send({ "sub": data, "status": "success" });
    }).catch((error) => {
        console.log(error,"Razorpay")
        return res.send({ "sub": error, "status": "failed" });
    })
})

module.exports = router