const express = require('express')
const path = require('path')
const dotenv = require("dotenv").config()
const morgan = require('morgan')
const Cookies = require("cookie-parser")
const port = process.env.PORT || 4001
var app = express()
var nodemailer = require("nodemailer")

//view engine
app.set('view engine', 'ejs')

app.use(morgan("dev"))

app.use(Cookies())

//static path
app.use("/views", express.static(path.join(__dirname + "/views")))
app.use("/routers", express.static(path.join(__dirname + "/routers")))
app.use(express.static(path.join(__dirname + "/assets")))

//body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const { authVerify } = require("./middlewares/auth.middleware")

app.get("/", (req, res) => {
    res.render("index", { page_name: "home" })
})
app.get("/about", (req, res) => {
    res.render("about", { page_name: "about" })
})
app.get("/academic", (req, res) => {
    res.render("academic", { page_name: "academic" })
})
app.get("/contact", (req, res) => {
    res.render("contact", { page_name: "contact" })
})
app.get("/team", (req, res) => {
    res.render("team", { page_name: "team" })
})
app.get("/testimonials", (req, res) => {
    res.render("testimonials", { page_name: "testimonials" })
})
app.get("/viewcart", (req, res) => {
    res.render("view-cart", { page_name: "view-cart" })
})



//init routers
app.use("/", require("./routers/auth.router"))
app.use("/user", require("./routers/users.router"))
app.use("/hash", require("./routers/hash.router"))
app.use("/dashboard", require("./routers/dashboard.router"))
app.use("/razorpay", require("./routers/razorpay"))
app.use("/mail", require("./routers/mail"))

app.listen(port, () => { console.log(`App Running on http://localhost:${port}`) })