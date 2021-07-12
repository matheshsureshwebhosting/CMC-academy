var db = firebase.firestore();
var courseid=localStorage.getItem("courseid")

db.collection("timetable").doc(courseid).collection("batchno").get().then((snap) => {
    snap.forEach((doc) => {        
        document.getElementById("timetable").innerHTML += "<tr class='newcourse1'><td>" +"Batch No : "+ doc.data().coursedata.batchno + "</td><td>" + "<button class='btn btn-danger' id=" + doc.data().coursedata.batchno + " onclick='view(this)' data-toggle='modal' data-target='#exampleModaledit'><i class='fa fa-file-o aria-hidden='true></i>Upload</button> " + "</td></tr>"
    })
})

view=(e)=>{    
    localStorage.setItem("batchno",e.id)
}