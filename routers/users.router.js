const router = require("express").Router()
const firebase = require("../database/firebase")
const db = firebase.firestore()

const Users = require("../modules/user.modules")

router.get("/single", async (req, res) => {
    const { indosnumber } = req.headers    
    const getusr = await Users.indosNumber(indosnumber)
    return res.send(getusr)
})

module.exports = router