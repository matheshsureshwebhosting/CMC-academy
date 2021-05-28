const bcrypt = require("bcryptjs")

module.exports.createrHashpwd = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashPwd = await bcrypt.hashSync(password, salt)
        return hashPwd
    } catch (error) {
        if (error) return false
    }
}

module.exports.verifyPwd = async (password, hashPwd) => {
    try {
        const verifyPwd = await bcrypt.compare(password, hashPwd)
        return verifyPwd
    } catch (error) {
        if (error) return false
    }
}