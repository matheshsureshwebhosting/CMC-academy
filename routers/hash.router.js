const router = require("express").Router()

const HASH = require("../helpers/bcrypt")

router.post("/generate", async (req, res) => {
    const { password } = req.body
    const hashPwd = await HASH.createrHashpwd(password)
    if (hashPwd === false) return res.send(false)
    return res.send(hashPwd)
})

router.post("/verify", async (req, res) => {
    const { password, hashPwd } = req.body    
    const verifyPwds = await HASH.verifyPwd(password, hashPwd)    
    if (verifyPwds === false) return res.send(false)
    return res.send(hashPwd)
})

router.post("/change", async (req, res) => {
    const { password,hashPwd } = req.body    
    const verifyPwds = await HASH.verifyPwd(password,hashPwd)    
    if (verifyPwds === false) return res.send(false)
    return res.send(hashPwd)
})


module.exports = router