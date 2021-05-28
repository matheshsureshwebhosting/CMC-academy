const express = require('express')
const path = require('path')
const dotenv = require("dotenv").config()
const morgan = require('morgan')
const port = process.env.PORT || 4001
var app = express()

//view engine
app.set('view engine', 'ejs')

app.use(morgan("dev"))

//static path
app.use("/views", express.static(path.join(__dirname + "/views")))
app.use("/routers", express.static(path.join(__dirname + "/routers")))
app.use(express.static(path.join(__dirname + "/assets")))

//body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/home", (req, res) => {
    res.render("index")
})
app.get("/about", (req, res) => {
    res.render("about")
})
app.get("/academic", (req, res) => {
    res.render("academic")
})
app.get("/contact", (req, res) => {
    res.render("contact")
})
app.get("/team", (req, res) => {
    res.render("team")
})
app.get("/testimonials", (req, res) => {
    res.render("testimonials")
})

//init routers
app.use("/", require("./routers/auth.router"))
app.use("/dashboard", require("./routers/dashboard.router"))


app.listen(port, () => { console.log(`App Running on http://localhost:${port}`) })