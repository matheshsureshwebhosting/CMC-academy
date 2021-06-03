var db = firebase.firestore();
var userid = localStorage.getItem("userid")

db.collection("cart").where("userid", "==", userid).get().then((snap) => {
    var data = []
    snap.forEach((doc) => {
        data.push(doc.data())
        document.getElementById("cartitem").innerHTML += `
        <div class="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
        <div class="d-flex flex-row">
            <div class="ml-2">
                <span class="font-weight-bold d-block">${doc.data().title}</span>
                <span class="spec">${doc.data().category}</span>
            </div>
        </div>
        <div class="d-flex flex-row align-items-center">
            <span class="d-block ml-5 font-weight-bold">Rs.
                ${doc.data().fees}</span>
            <i class="ti-trash ml-3 text-black-50" style="cursor: pointer;" id="${doc.id}" onclick='del(this.id)'></i>
        </div>
    </div>
       `
    })
    document.getElementById("cartcount").innerHTML = data.length
})

del = (e) => {
    db.collection("cart").doc(e).delete().then(() => {
        // toastr["error"]("Course Deleted");
        setTimeout(() => { window.location.reload() }, 1000)
    })

}