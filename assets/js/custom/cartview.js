var db = firebase.firestore();
var userid = localStorage.getItem("userid")

db.collection("cart").where("userid", "==", userid).get().then((snap) => {
    snap.forEach((doc) => {
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
    })
})