const router = require("express").Router()
const createHttpError = require("http-errors")
const friebase = require("../database/firebase")
const db = friebase.firestore()

const Auth = require("../modules/auth.modules")
const Hash = require("../helpers/bcrypt")
const JWT = require("../helpers/jwt")
const dates = require("../helpers/date")

router.get("/", async (req, res) => {
    res.render("login")
})
router.get("/signup", async (req, res) => {
    res.render("signup")
})
router.get("/change_password", async (req, res) => {
    res.render("change_password")
})

router.post("/signup", async (req, res) => {
    const { indosnumber, password, clientid } = req.body   
    try {
        const asscountcheck = await Auth.accountCheck(indosnumber)
        console.log(asscountcheck)
        if (asscountcheck != false) throw createHttpError(400, "You Already Registerd")
        const generateHashpwd = await Hash.createrHashpwd(password)
        const createToken = await JWT.createToken(clientid)
        const today = await dates.Day()
        const userinfo = req.body
        userinfo["password"] = generateHashpwd
        userinfo["token"] = createToken
        userinfo["date"] = today        
        const createacc = await Auth.createAccount(userinfo)
        return res.cookie("_id",createToken).send(createacc)
    } catch (error) {
        return res.status(error.status).send(error.message)
    }
})

router.post("/login", async (req, res) => {
    const { indosnumber, password } = req.body
    try {
        const asscountcheck = await Auth.accountCheck(indosnumber)
        console.log(asscountcheck)
        if (asscountcheck == false) throw createHttpError(400, "You Are Not Registerd")
        const hashPWd = await asscountcheck.password
        const generateHashpwd = await Hash.verifyPwd(password, hashPWd)
        if (!generateHashpwd) throw createHttpError(400, "Password In-valid")
        const token = await asscountcheck.token
        return res.send({ token: token })
    } catch (error) {
        return res.status(error.status).send(error.message)
    }
})
module.exports = router