var db = firebase.firestore();

db.collection("feedback").get().then((snap)=>{
    snap.forEach((doc)=>{
        document.getElementById("users").innerHTML += "<tr class='newcourse1'><td>" + doc.data().name + "</td><td>" + doc.data().feedback 
            + "</td><td>" + "<button class='btn btn-danger' id=" + doc.id + " onclick='del(this.id)'><i class='fa fa-trash-o aria-hidden='true></i> Delete</button> " + "</td></tr>"
    })
})

del = (e) => {

    db.collection("feedback").doc(e).delete().then(() => {
        // toastr["error"]("Course Deleted");
        setTimeout(() => { window.location.reload() }, 1000)
    })

}