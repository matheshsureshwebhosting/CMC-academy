var db = firebase.firestore();

var categoryid = sessionStorage.getItem("categoryid")
var categoryname = sessionStorage.getItem("categoryname")
db.collection("category").doc(categoryid).get().then((doc) => {
    document.getElementById("category").value = doc.data().category
})

document.getElementById("newcoursebtn").addEventListener("click", async () => {

    var tabledata = []
    var data = {}
    var batch = document.querySelectorAll(".batch")
    for (var i = 0; i < batch.length; i++) {
        tabledata.push(
            data = {
                "batch": document.getElementsByClassName("batch")[i].value,
                "date": document.getElementsByClassName("date")[i].value,

            }
        )
    }

    var category = document.getElementById("category").value
    var title = document.getElementById("title").value
    var subheading = document.getElementById("subheading").value
    var duration = document.getElementById("duration").value
    var mode = document.getElementById("mode").value
    var rfees = document.getElementById("rfees").value
    var ofees = document.getElementById("ofees").value
    var eligibility = document.getElementById("eligibility").value
    var documents = document.getElementById("documents").value
    var description = document.getElementById("description").value
    var thumb = document.querySelector("#thumb").files
    document.getElementById("newcoursebtn").innerHTML = " <span class='spinner-border spinner-border-sm mr-2' role='status'style='padding: 7px;' aria-hidden='true'></span>Please Wait..."
    let file11 = new Promise((resolve, reject) => {
        var storageRef = firebase.storage().ref("thumbnail/" + thumb[0].name);
        var test = [];
        storageRef.put(thumb[0]).then(function (snapshot) {
            storageRef.getDownloadURL().then(function (url) {  //img download link ah ketakiradhu
                setTimeout(() => resolve(url), 1000)
            })
        });

    });
    var imgurl = await file11
    const today = new Date();
    const monthsandday = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
        "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"]
    const date = today.getFullYear() + '-' + (monthsandday[today.getMonth() + 1]) + '-' + (monthsandday[today.getDate()]);
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    var newcoursedata = {
        category: category,
        title: title,
        subheading: subheading,
        duration: duration,
        mode: mode,
        rfees: rfees,
        ofees: ofees,
        eligibility: eligibility,
        documents: documents,
        description: description,
        thum: imgurl,
        date: dateTime,
        startdate: tabledata,
    }

    db.collection("newcourse").doc().set(newcoursedata).then(() => {

        toastr["success"]("New Course Created Successfully..");
        setTimeout(() => { window.location.reload() }, 2000)
    }).catch((error) => {
        console.log(error.message)
        toastr["error"](error.message);
    })
})



db.collection("newcourse").orderBy("date", "desc").get().then((snap) => {
    coursedata = []
    snap.forEach((doc) => {
        if (doc.data() != undefined) {
            if (doc.data().courseid == undefined) {
                if (doc.data().category == categoryname) {
                    coursedata.push(doc.data())
                    document.getElementById("coursenoti").style.display = "none"
                    document.getElementById("newcourse").innerHTML += "<tr class='newcourse1'><td>" + doc.data().title + "</td><td>" + doc.data().category + "</td><td>" + doc.data().duration + "</td><td>" + doc.data().ofees
                        + "</td><td>" + "<button class='btn btn-danger' id=" + doc.id + " onclick='del(this.id)'><i class='fa fa-trash-o aria-hidden='true></i> Delete</button> <button class='btn btn-info' id=" + doc.id + " data-bs-toggle='modal' data-bs-target='#exampleModaledit' onclick='edit(this.id)'><i class='fa fa-pencil aria-hidden='true></i> Edit</button>" + "</td></tr>"
                }

            }

        } else {
            document.getElementById("coursenoti").style.display = "block"
        }

    })
    console.log(coursedata.length)
    if (coursedata.length != 0) {
        var items = $(".newcourse .coursedata1");
        var numItems = coursedata.length;

        var perPage = 4;

        items.slice(perPage).hide();

        $('#pagination-containerf1').pagination({
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
        document.getElementById("coursenoti").style.display = "none"
    } else {
        document.getElementById("coursenoti").style.display = "block"
    }
})

del = (e) => {


    db.collection("newcourse").doc(e).delete().then(() => {
        // toastr["error"]("Course Deleted");
        setTimeout(() => { window.location.reload() }, 1000)
    })

}


edit = (e) => {


    db.collection("newcourse").doc(e).get().then(async (doc) => {

        document.getElementById("ucategory").value = doc.data().category
        document.getElementById("udescription").value = doc.data().description
        document.getElementById("udocuments").value = doc.data().documents
        document.getElementById("uduration").value = doc.data().duration
        document.getElementById("ueligibility").value = doc.data().eligibility
        document.getElementById("umode").value = doc.data().mode
        document.getElementById("uofees").value = doc.data().ofees
        document.getElementById("urfees").value = doc.data().rfees
        document.getElementById("usubheading").value = doc.data().subheading
        document.getElementById("utitle").value = doc.data().title
        for (var i = 0; i < doc.data().startdate.length; i++) {
            document.getElementById("startdatediv").innerHTML += `
            <input type="date" class="form-control usestartdate" id="ustartdate" value="${doc.data().startdate[i].date}" placeholder="">
            `
        }
        document.getElementById("newcoursebtnu").addEventListener("click", async () => {

            document.getElementById("newcoursebtnu").innerHTML = " <span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>Uploading..."

            var startdate = document.querySelectorAll(".usestartdate")
            var datadate = []
            for (var i = 0; i < startdate.length; i++) {
                var editdate = document.getElementsByClassName("usestartdate")[i].value
                datadate.push({ batch: i + 1, date: editdate })
            }
            db.collection("newcourse").doc(e).update({
                category: document.getElementById("ucategory").value,
                description: document.getElementById("udescription").value,
                documents: document.getElementById("udocuments").value,
                duration: document.getElementById("uduration").value,
                eligibility: document.getElementById("ueligibility").value,
                mode: document.getElementById("umode").value,
                ofees: document.getElementById("uofees").value,
                rfees: document.getElementById("urfees").value,
                subheading: document.getElementById("usubheading").value,
                title: document.getElementById("utitle").value,
                startdate: datadate

            }).then((doc) => {
                toastr["success"]("Course Updated Successfully..");
                setTimeout(() => { window.location.reload() }, 1000)
                // document.getElementById("enewcoursebtn").innerHTML = "Update"
            })
        })
    })



}