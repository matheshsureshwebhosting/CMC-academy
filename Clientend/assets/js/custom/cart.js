var db = firebase.firestore();
var userid = sessionStorage.getItem("userid")

db.collection("cart").where("userid", "==", userid).get().then((snap) => {
    var data=[]
    snap.forEach((doc) => {
        data.push(doc.data().fees)
        document.getElementById("cart").innerHTML += `
        <li li class="waves-effect waves-light" >
            <div class="media">
                <div class="media-body">
                    <h5 class="notification-user">${doc.data().category}</h5>
                    <p>${doc.data().title} - Rs : ${doc.data().fees}</p>
                </div>
                <a class="discard btn btn-danger text-light" id="${doc.id}" onclick='del(this.id)'>Discard</a>
            </div>
        </li >
        `
        if (doc.data == undefined) {
            document.getElementById("cartdes").style.display = "block"
        }
        else {
            document.getElementById("cartdes").style.display = "none"
        }
    })
})

db.collection("cart").where("userid", "==", userid).get().then((snap) => {
    var data = []
    snap.forEach((doc) => {
        data.push(doc.data)
    })
    document.getElementById("cartitem").innerHTML = data.length
})

del = (e) => {
    db.collection("cart").doc(e).delete().then(() => {
        toastr["error"]("Course Deleted");
        setTimeout(() => { window.location.reload() }, 1000)
    })

}