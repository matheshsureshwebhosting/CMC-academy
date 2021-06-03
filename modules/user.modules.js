const firebase = require("../database/firebase")
const db = firebase.firestore()

module.exports.indosNumber = async (indosnumber) => {
    const indosNumber = new Promise(async (resolve, reject) => {
        await db.collection("users").where("indosnumber", "==", indosnumber).get().then((snap) => {
            snap.forEach((doc) => {
                if (doc.data() == undefined) return resolve(false)
                return resolve(doc.data().email)
            })
        }).catch((error) => {
            return resolve(false)
        })
    })
    return await indosNumber
}