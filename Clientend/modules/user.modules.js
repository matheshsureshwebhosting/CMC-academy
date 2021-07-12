const firebase = require("../database/firebase")
const db = firebase.firestore()

module.exports.indosNumber = async (indosnumber) => {
    const indosNumber = new Promise(async (resolve, reject) => {
        await db.collection("users").where("indosnumber", "==", indosnumber).get().then((snap) => {
            const data = []
            snap.forEach((doc) => {
                if (doc.data() == undefined) return resolve(false)
                data.push(doc.data().email)
            })            
            if (data.length == 0) return resolve(false)
            return resolve(data[0])
        }).catch((error) => {
            return resolve(false)
        })
    })
    return await indosNumber
}

module.exports.Email = async (email) => {
    const Email = new Promise(async (resolve, reject) => {
        await db.collection("users").where("email", "==", email).get().then((snap) => {
            const data=[]
            snap.forEach((doc) => {
                if (doc.data() == undefined) return resolve(false)
                data.push({password:doc.data().password,token:doc.data().token})                
            })
            if (data.length == 0) return resolve(false)
            return resolve(data[0])
        }).catch((error) => {
            return resolve(false)
        })
    })
    return await Email
}

module.exports.Clientid = async (clientid) => {
    const Userid = new Promise(async (resolve, reject) => {
        await db.collection("users").where("clientid", "==", clientid).get().then((snap) => {
            const data=[]
            snap.forEach((doc) => {
                if (doc.data() == undefined) return resolve(false)
                data.push(doc.data())                
            })
            if (data.length == 0) return resolve(false)
            return resolve(data[0])
        }).catch((error) => {
            return resolve(false)
        })
    })
    return await Userid
}