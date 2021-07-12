const router = require("express").Router()
const createHttpError = require("http-errors")
const friebase = require("../database/firebase")
const db = friebase.firestore()

const Auth = require("../modules/auth.modules")
const Hash = require("../helpers/bcrypt")
const JWT = require("../helpers/jwt")
const dates = require("../helpers/date")

const { authCheck } = require("../middlewares/auth.middleware")

router.get("/login", authCheck, async (req, res) => {
    res.render("login")
})
router.get("/signup", authCheck, async (req, res) => {
    res.render("signup", { page_name: "signup" })
})
router.get("/change_password", async (req, res) => {
    res.render("change_password")
})
router.get("/forgot", async (req, res) => {
    res.render("forgot")
})
router.post("/signup", async (req, res) => {
    const { indosnumber, clientid } = req.body
    try {
        const asscountcheck = await Auth.accountCheck(indosnumber)
        if (asscountcheck != false) throw createHttpError(400, "You Already Registerd")
        const createToken = await JWT.createToken(clientid)
        const today = await dates.Day()
        const userinfo = req.body
        userinfo["token"] = createToken
        userinfo["date"] = today
        const createacc = await Auth.createAccount(userinfo)
        return res.send(createacc)
    } catch (error) {
        return res.status(error.status).send(error.message)
    }
})

router.get("/check", async (req, res) => {
    const { indosnumber } = req.headers
    try {
        const asscountcheck = await Auth.accountCheck(indosnumber)
        return res.send(asscountcheck)
    } catch (error) {
        return res.status(error.status).send(error.message)
    }
})

router.post("/login", async (req, res) => {
    const { indosnumber, password } = req.body
    try {
        const asscountcheck = await Auth.accountCheck(indosnumber)
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

router.get("/logout", (req, res) => {
    res.clearCookie("_id")
    return res.redirect("/")
})

router.post("/updatepassword", async (req, res) => {
    const { clientid } = req.headers
    const { password } = req.body
    try {
        if (!clientid) throw createHttpError(400, "Userid Required")
        await db.collection("users").doc(clientid).update({
            password: password
        }).then(() => { return res.send(true) }).catch((error) => { if (error) return res.send(false) })
    } catch (error) {
        return res.status(error.status).send(error.message)
    }
})


router.post("/change", async (req, res) => {
    const { password } = req.body
    try {
        const hashPWd = await asscountcheck.password
        const generateHashpwd = await Hash.verifyPwd(password, hashPWd)
        if (!generateHashpwd) throw createHttpError(400, "Password In-valid")
        return res.send(generateHashpwd)        
    } catch (error) {
        return res.status(error.status).send(error.message)
    }
})



module.exports = router