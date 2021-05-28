const jwt=require("jsonwebtoken")

module.exports.createToken=async(userid)=>{
    try {
        const Token=await jwt.sign(userid,process.env.JWT_KEY)
        return Token
    } catch (error) {
        if(error) return false
    }
}

module.exports.verifyToken=async (token)=>{
    try {
        var data=jwt.verify(token,process.env.JWT_KEY)
        return data
    } catch (error) {
        return false
    }
}