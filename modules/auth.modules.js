const friebase = require("../database/firebase")
const db = friebase.firestore()

module.exports.accountCheck = async (indosnumber) => {
    const accountCheck = new Promise(async (resolve, reject) => {
        await db.collection("users").get().then((snap) => {
            snap.forEach((doc) => {
                if (doc.data == undefined) return resolve(false)                
                if (doc.data().indosnumber==indosnumber) return resolve(doc.data())
                return resolve(false)
            })
        }).catch((error) => { if (error) return resolve(false) })
    })
    return await accountCheck
}


module.exports.createAccount = async (userinfo) => {
    const createAccount = new Promise(async (resolve, reject) => {
        const { clientid } = userinfo
        db.collection("users").doc(clientid).set(userinfo).then(() => {
            return resolve(true)
        }).catch((error) => { if (error) return resolve(false) })
    })
    return await createAccount
}
