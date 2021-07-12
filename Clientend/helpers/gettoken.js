module.exports.getToken = async (token) => {
    const mytoken = new Promise(async (resolve, reject) => {
        if(token==undefined) return resolve(false)
        const tokens = token.split(" ")
        if (tokens.length != 2) return resolve(false)
        const finalToken = tokens[1]
        return resolve(finalToken)
    })
    return await mytoken
}