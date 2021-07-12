const express = require('express')
const path = require('path')
const port = process.env.PORT || 4004
var app = express()
var firebase = require("./database/firebase")
var dotenv=require("dotenv").config()
var db = firebase.firestore();
//view engine
app.set('view engine', 'ejs')

//static path
app.use("/views", express.static(path.join(__dirname + "/views")))
app.use("/assets", express.static(path.join(__dirname + "/assets")))


//body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.render("index")
})
app.get("/home", (req, res) => {
    res.render("dashboard")
})
app.get("/newcourse", (req, res) => {
    res.render("newcourse")
})
app.get("/users", (req, res) => {
    res.render("users")
})
app.get("/feedback", (req, res) => {
    res.render("feedback")
})
app.get("/enquiry", (req, res) => {
    res.render("enquiry")
})
app.get("/subcourse", (req, res) => {
    res.render("subcourse")
})
app.get("/subcourseview", (req, res) => {
    res.render("subcourseview")
})
app.get("/purchasehistory", (req, res) => {
    res.render("purchasehistory")
})
app.get("/faculty", (req, res) => {
    res.render("faculty")
})
app.get("/gallery", (req, res) => {
    res.render("gallery")
})
app.get("/certificateupload", (req, res) => {
    res.render("certificateupload")
})
app.get("/timetablecreate", (req, res) => {
    res.render("timetablecreate")
})
app.get("/timetable", (req, res) => {
    res.render("timetable")
})
app.get("/timetableview", (req, res) => {
    res.render("timetableview")
})
app.get("/pdf", (req, res) => {
    res.render("pdf")
})
app.get("/discount", (req, res) => {
    res.render("discount")
})
app.get("/category", (req, res) => {
    res.render("category")
})


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

app.post('/timetablesend', async (req, res) => {
    console.log(req.body.email)
    mailOptions = {
        from: process.env.EMAIL_USER,
        to:req.body.email,
        subject: "Time Table",
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

app.listen(port, () => { console.log(`App Running on http://localhost:${port}`) })