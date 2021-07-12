var db = firebase.firestore();

document.getElementById("newfacultybtn").addEventListener("click", async () => {

    //var fimage = document.querySelector("fimage").files
    var fname = document.getElementById("fname").value
    var fposition = document.getElementById("fposition").value
    var fdescription = document.getElementById("fdescription").value
    var fimage = document.querySelector("#fimage").files
    document.getElementById("newfacultybtn").innerHTML = " <span class='spinner-border spinner-border-sm mr-2' role='status'style='padding: 7px;' aria-hidden='true'></span>Please Wait..."
    let file11 = new Promise((resolve, reject) => {
        var storageRef = firebase.storage().ref("faculty/" + fimage[0].name);
        storageRef.put(fimage[0]).then(function (snapshot) {
            storageRef.getDownloadURL().then(function (url) {  //img download link ah ketakiradhu
                setTimeout(() => resolve(url), 1000)
            })
        });

    });
    var imgurl = await file11

    var facultydata = {
        fimage: imgurl,
        fname: fname,
        fposition: fposition,
        fdescription: fdescription
    }

    db.collection("faculty").doc().set(facultydata).then(() => {
        console.log("New Faculty added Successfully..")
        setTimeout(() => { window.location.reload() }, 2000)
    }).catch((error) => {
        console.log(error.message)
    })

})

db.collection("faculty").orderBy("fname", "desc").get().then((snap) => {
    facultydata=[]
    snap.forEach((doc) => {
        if (doc.data() != undefined) {
            if (doc.data().facultyid == undefined) {
                facultydata.push(doc.data())
                console.log(doc.data)
                document.getElementById("facultynoti").style.display = "none"
                document.getElementById("newfaculty").innerHTML += "<tr class='newfaculty1'><td><img src=" + doc.data().fimage + " width=50 height=50></td><td>" + doc.data().fname + "</td><td>" + doc.data().fposition + "</td><td>" + doc.data().fdescription + "</td><td>" + "<button class='btn btn-danger' id=" + doc.id + " onclick='del(this.id)'><i class='fa fa-trash-o aria-hidden='true></i> Delete</button> <button class='btn btn-info' id=" + doc.id + " data-bs-toggle='modal' data-bs-target='#exampleModaledit' onclick='edit(this.id)'><i class='fa fa-pencil aria-hidden='true></i> Edit</button>" + "</td></tr>"
            }

        } else {
            document.getElementById("facultynoti").style.display = "block"
        }

    })
    console.log(facultydata.length)
    if (facultydata.length != 0) {
        var items = $(".newfaculty .newfaculty1");
        var numItems = facultydata.length;

        var perPage = 10;

        items.slice(perPage).hide();

        $('#pagination-container1').pagination({
            items: numItems,
            itemsOnPage: perPage,
            prevText: "&laquo;",
            nextText: "&raquo;",
            onPageClick: function (pageNumber) {
                var showFrom = perPage * (pageNumber - 1);
                var showTo = showFrom + perPage;
                items.hide().slice(showFrom, showTo).show();
            }
        });
        document.getElementById("facultynoti").style.display = "none"
    } else {
        document.getElementById("facultynoti").style.display = "block"
    }
})

del = (e) => {


    db.collection("faculty").doc(e).delete().then(() => {
        // toastr["error"]("Course Deleted");
        setTimeout(() => { window.location.reload() }, 1000)
    })

}

edit = (e) => {
    console.log(e)
    localStorage.setItem("facultyid", e)
    db.collection("faculty").doc(e).get().then(async (doc) => {

        document.getElementById("fimagee").value = doc.data().fimage
        document.getElementById("fnamee").value = doc.data().fname
        document.getElementById("fpositione").value = doc.data().fposition
        document.getElementById("fdescriptione").value = doc.data().fdescription

    })

}


document.getElementById("newfacultybtnu").addEventListener("click", async () => {
    var facultyid = localStorage.getItem("facultyid")
    document.getElementById("newfacultybtnu").innerHTML = " <span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>Uploading..."
    db.collection("faculty").doc(facultyid).update({
        //category: document.getElementById("ucategory").value,
        fname: document.getElementById("fnamee").value,
        fposition: document.getElementById("fpositione").value,
        fdescription: document.getElementById("fdescriptione").value,
    }).then((doc) => {

        toastr["success"]("Faculty Details Updated Successfully..");
        localStorage.removeItem("facultyid")
        setTimeout(() => { window.location.reload() }, 1000)
        // document.getElementById("enewcoursebtn").innerHTML = "Update"
    })
})