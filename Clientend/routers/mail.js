const router = require("express").Router()
var nodemailer = require('nodemailer')


var smtpTransport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    secure: process.env.EMAIL_SECURE,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});

router.post('/registersend', async (req, res) => {
    mailOptions = {
        from: process.env.EMAIL_USER,
        to:"s.kalidas120799@gmail.com" ,  //req.body.email
        subject: "Account Registration",
        text: "Hello world?",
        html: req.body.mailtemplate,
    }
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            return res.send(false)
        } else {
            console.log(response)
            return res.send(true)

        }
    });
})

router.post('/coursepurchasesend', async (req, res) => {
    mailOptions = {
        from: 'notification@merchantox.com',
        to: req.body.email,
        subject: "Course Purchase",
        text: "Hello world?",
        html: req.body.mailtemplate,
    }
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            return res.send(false)
        } else {
            console.log(response)
            return res.send(true)

        }
    });
})



module.exports = router