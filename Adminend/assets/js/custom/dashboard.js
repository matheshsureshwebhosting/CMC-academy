var db = firebase.firestore();
db.collection("users").get().then((snap) => {
    var userdata = []
    snap.forEach((doc) => {
        userdata.push(doc.data())
    })
    document.getElementById("customers").innerHTML = userdata.length
})

db.collection("newcourse").get().then((snap) => {
    var coursedata = []
    snap.forEach((doc) => {
        coursedata.push(doc.data())
    })
    document.getElementById("courses").innerHTML = coursedata.length
})
db.collection("purchasecourses").get().then((snap) => {
    var purchaseedata = []
    snap.forEach((doc) => {
        purchaseedata.push(doc.data())
    })
    document.getElementById("purchasecourse").innerHTML = purchaseedata.length
})
db.collection("certificates").get().then((snap) => {
    var completedata = []
    snap.forEach((doc) => {
        completedata.push(doc.data())
    })
    document.getElementById("completecourse").innerHTML = completedata.length
})