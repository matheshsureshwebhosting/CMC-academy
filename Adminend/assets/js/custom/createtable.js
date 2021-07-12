var db= firebase.firestore()
var courseid=localStorage.getItem("courseid")

db.collection("newcourse").doc(courseid).get().then((doc)=>{
    console.log(doc.data())
    document.getElementById("coursename").value=doc.data().title
    document.getElementById("subheading").value=doc.data().subheading
})