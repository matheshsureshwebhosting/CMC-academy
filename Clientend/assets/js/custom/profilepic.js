var db = firebase.firestore();
var userid = sessionStorage.getItem("userid")

db.collection("users").doc(userid).get().then((doc) => {
    if (doc.data() != undefined) {
        document.getElementById("hdpname").innerHTML = `${doc.data().firstname} ${doc.data().lastname}`
        document.getElementById("dashdpname").innerHTML = `${doc.data().firstname} ${doc.data().lastname}<i class="fa fa-caret-down"></i>`

        if (doc.data().profilepic !== undefined) {
            document.getElementById("dashdppic").src = `${doc.data().profilepic}`
            document.getElementById("hdppic").src = `${doc.data().profilepic}`
        }
    }

})