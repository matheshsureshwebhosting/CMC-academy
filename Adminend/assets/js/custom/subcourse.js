var db = firebase.firestore();

db.collection("newcourse").orderBy("date", "desc").get().then((snap) => {
    coursedata=[]
    snap.forEach((doc) => {
        if (doc.data().courseid == undefined) {
            coursedata.push(doc.data())
            document.getElementById("newcourse").innerHTML += "<tr class='newcourse1'><td>" + doc.data().category + "</td><td>" + "<button class='btn btn-danger' id=" + doc.id + " onclick='view(this.id)'><i class='fa fa-file-o aria-hidden='true></i> View</button> <button class='btn btn-info' id=" + doc.id + " data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='add(this.id)'><i class='fa fa-pencil aria-hidden='true></i> Add</button>" + "</td></tr>"
        }

    })
    console.log(coursedata.length)
    if (coursedata.length != 0) {
        var items = $("#newcourse .newcourse1");
        var numItems = coursedata.length;

        var perPage = 4;

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
        document.getElementById("coursenoti").style.display = "none"
    } else {
        document.getElementById("coursenoti").style.display = "block"
    }
})

view = (e) => {
    localStorage.setItem("courseid", e)
    window.location.replace("/subcourseview")
}


add = (e) => {
    db.collection("newcourse").doc(e).get().then(async (doc) => {


        document.getElementById("category").value = doc.data().category
        document.getElementById("eligibility").value = doc.data().eligibility
        document.getElementById("documents").value = doc.data().documents
        document.getElementById("description").value = doc.data().description
        document.getElementById("newsubcoursebtn").addEventListener("click", async () => {

            tabledata = []
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
            console.log(tabledata)

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

            document.getElementById("newsubcoursebtn").innerHTML = " <span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>Please Wait..."
            const today = new Date();
            const monthsandday = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
                "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"]
            const date = today.getFullYear() + '-' + (monthsandday[today.getMonth() + 1]) + '-' + (monthsandday[today.getDate()]);
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date + ' ' + time;
            var newsubcoursedata = {
                category: category,
                title: title,
                subheading: subheading,
                duration: duration,
                mode: mode,
                date: dateTime,
                startdate: tabledata,
                courseid: e,
                rfees: rfees,
                eligibility: eligibility,
                ofees: ofees,
                documents: documents,
                description: description,
                thum: doc.data().thum
            }
            console.log(newsubcoursedata)
            db.collection("newcourse").doc().set(newsubcoursedata).then(() => {
                toastr["success"]("New SubCourse Created Successfully..");
                setTimeout(() => { window.location.reload() }, 2000)
            }).catch((error) => {
                console.log(error.message)
            })
        })
    })

}


