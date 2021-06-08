const router = require("express").Router()
const firebase = require("../database/firebase")
const db = firebase.firestore()

const Users = require("../modules/user.modules")

router.get("/single/indosnumber", async (req, res) => {
    const { indosnumber } = req.headers
    const getuser = await Users.indosNumber(indosnumber)
    return res.send(getuser)
})
router.get("/single/email", async (req, res) => {
    const { email } = req.headers
    const getuser = await Users.Email(email)
    return res.send(getuser)
})
router.get("/single/clientidauth", async (req, res) => {
    const { clientid } = req.headers
    const getuser = await Users.Clientid(clientid)
    return res.cookie("_id", getuser.token).send(getuser)
})
router.get("/single/clientid", async (req, res) => {
    const { clientid } = req.headers
    const getuser = await Users.Clientid(clientid)
    return res.send(getuser)
})
module.exports = router