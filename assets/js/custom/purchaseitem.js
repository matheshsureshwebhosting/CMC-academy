var db = firebase.firestore();
var userid = localStorage.getItem("userid")

db.collection("purchasecourses").where("userid", "==", userid).get().then((snap) => {
    snap.forEach((doc) => {
        db.collection("newcourse").doc(doc.data().coureseid).get().then((docs) => {
            if (docs.data() != undefined) {
                document.getElementById("coursenoti").style.display = "none"
                document.getElementById("purchaseitem").innerHTML += `
            <tr>
                <td>${docs.data().title}</td>
                <td class="d-none d-md-table-cell">${docs.data().startdate}</td>
                <td class="ongoing">${doc.data().status}</td>
            </tr>
            `
            } else {
                document.getElementById("coursenoti").style.display = "block"
            }

        })
    })
})