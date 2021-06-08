module.exports.authVerify = (req, res, next) => {
    const { _id } = req.cookies
    if (_id == undefined) {
        return res.redirect("/login")
    } else {
        next()
    }

}

module.exports.authCheck = (req, res, next) => {
    const { _id } = req.cookies
    if (_id == undefined) {
       next()
    } else {
        return res.redirect("/")
    }

}