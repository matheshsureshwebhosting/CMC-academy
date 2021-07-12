var db = firebase.firestore();
var courseid = localStorage.getItem("courseid")

db.collection("newcourse").where("courseid", "==", courseid).get().then((snap) => {
    snap.forEach((doc) => {
        if (doc.data() != undefined) {
            document.getElementById("coursenoti").style.display = "none"
            document.getElementById("newsubcourse").innerHTML += "<tr class='newcourse1'><td>" + doc.data().category + "</td><td>" + doc.data().title + "</td><td>" + doc.data().subheading + "</td><td>" + doc.data().duration + "</td><td>" + doc.data().mode + "</td><td>" + "<button class='btn btn-danger' id=" + doc.id + " onclick='del(this.id)'><i class='fa fa-trash-o aria-hidden='true></i> Delete</button> <button class='btn btn-info' id=" + doc.id + " data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='edit(this.id)'><i class='fa fa-pencil aria-hidden='true></i> Edit</button>" + "</td></tr>"
        } else {
            document.getElementById("coursenoti").style.display = "block"
        }
    })
})

del = (e) => {


    db.collection("newcourse").doc(e).delete().then(() => {
        // toastr["error"]("Course Deleted");
        setTimeout(() => { window.location.reload() }, 1000)
    })

}


edit = (e) => {

    db.collection("newcourse").doc(e).get().then(async (doc) => {

        document.getElementById("category").value = doc.data().category
        document.getElementById("description").value = doc.data().description
        document.getElementById("documents").value = doc.data().documents
        document.getElementById("duration").value = doc.data().duration
        document.getElementById("eligibility").value = doc.data().eligibility
        document.getElementById("mode").value = doc.data().mode
        document.getElementById("ofees").value = doc.data().ofees
        document.getElementById("rfees").value = doc.data().rfees
        document.getElementById("subheading").value = doc.data().subheading
        document.getElementById("title").value = doc.data().title
        for (var i = 0; i < doc.data().startdate.length; i++) {
            document.getElementById("startdatediv").innerHTML += `
            <input type="date" class="form-control usestartdate" id="ustartdate" value="${doc.data().startdate[i].date}" placeholder="">
            `
        }

        document.getElementById("newsubcoursebtn").addEventListener("click", async () => {

            var startdate = document.querySelectorAll(".usestartdate")
            var datadate = []
            for (var i = 0; i < startdate.length; i++) {
                var editdate = document.getElementsByClassName("usestartdate")[i].value
                datadate.push({ batch: i + 1, date: editdate })
            }
            document.getElementById("newsubcoursebtn").innerHTML = " <span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>Please Wait..."
            db.collection("newcourse").doc(e).update({
                category: document.getElementById("category").value,
                duration: document.getElementById("duration").value,
                mode: document.getElementById("mode").value,
                subheading: document.getElementById("subheading").value,
                title: document.getElementById("title").value,
                startdate: datadate,
                ofees: document.getElementById("ofees").value,
                rfees: document.getElementById("rfees").value,
                description: document.getElementById("description").value,
                documents: document.getElementById("documents").value,
                eligibility: document.getElementById("eligibility").value

            }).then((doc) => {
                toastr["success"]("Course Updated Successfully...");
                console.log("Course Updated")
                setTimeout(() => { window.location.reload() }, 1000)
                // document.getElementById("enewcoursebtn").innerHTML = "Update"
            })
        })
    })



}