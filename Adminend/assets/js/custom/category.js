var db = firebase.firestore();

document.getElementById("newccatbtn").addEventListener("click", async () => {
    document.getElementById("newccatbtn").innerHTML = " <span class='spinner-border spinner-border-sm mr-2' role='status'style='padding: 7px;' aria-hidden='true'></span>Please Wait..."
    var category = document.getElementById("categorymain").value
    console.log(category)
    db.collection("category").doc().set({
        category: category
    }).then(() => {
        toastr["success"]("New Category Added Successfully..");
        setTimeout(() => { window.location.reload() }, 2000)
    }).catch((error) => {
        console.log(error.message)
        toastr["error"](error.message);
    })
})

db.collection("category").get().then((snap) => {
    var categorydata = []
    snap.forEach((doc) => {
        categorydata.push(doc.data())
        document.getElementById("category").innerHTML += "<tr class='newcourse1'><td>" + doc.data().category + "</td><td>" + "<button class='btn btn-danger' id=" + doc.id + " onclick='del(this.id)'><i class='fa fa-trash-o aria-hidden='true></i> Delete</button> <button class='btn btn-info' id=" + doc.id + " data-bs-toggle='modal' data-bs-target='#exampleModaledit' onclick='view(this.id)'><i class='fa fa-file-o aria-hidden='true></i> View Course</button>" + "</td></tr>"
    })
    if (categorydata.length != 0) {

        document.getElementById("coursenoti").style.display = "none"
    } else {
        document.getElementById("coursenoti").style.display = "block"
    }
})

del = (e) => {
    db.collection("category").doc(e).delete().then(() => {
        toastr["error"]("Category Deleted..");
        setTimeout(() => { window.location.reload() }, 1000)
    })
}

view = (e) => {
    console.log(e)
    db.collection("category").doc(e).get().then((doc) => {
        console.log(doc.data().category)
        sessionStorage.setItem("categoryname", doc.data().category)
    })
    sessionStorage.setItem("categoryid", e)
    setTimeout(() => { window.location.replace("/newcourse") }, 1000)

}