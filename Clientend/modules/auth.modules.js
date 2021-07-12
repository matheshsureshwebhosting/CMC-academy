const friebase = require("../database/firebase")
const db = friebase.firestore()

module.exports.accountCheck = async (indosnumber) => {
    const accountCheck = new Promise(async (resolve, reject) => {
        await db.collection("users").where("indosnumber", "==", indosnumber).get().then((snap) => {
            const data = []
            snap.forEach((doc) => {
                data.push(doc.data())
            })
            if (data.length == 0) return resolve(false)
            return resolve(data)
        }).catch((error) => { if (error) return resolve(false) })
    })
    return await accountCheck
}


module.exports.createAccount = async (userinfo) => {
    const createAccount = new Promise(async (resolve, reject) => {
        const { clientid } = userinfo
        db.collection("users").doc(clientid).set(userinfo).then(() => {
            return resolve({ status: true, clientid: clientid })
        }).catch((error) => { if (error) return resolve({ status: false }) })
    })
    return await createAccount
}
