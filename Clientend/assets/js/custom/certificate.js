var db = firebase.firestore();
var userid = sessionStorage.getItem("userid")

db.collection("certificates").get().then((snap)=>{
    snap.forEach((doc)=>{
        console.log(doc.data().coureseid);
        db.collection("newcourse").doc(doc.data().coureseid).get().then((docs)=>{
            console.log(docs.data());
            document.getElementById("certificatediv").innerHTML += `
            <tr>
                <td>${docs.data().title}</td>
                <td>${doc.data().status}</td>
                <td>${doc.data().date}</td>
                ${doc.data().certificate != null ?`<td><a href="${doc.data().certificate}" target=_blank download style="font-weight: bold;">Download</a></td>`: `<td></td>`}
               
            </tr>
            `
        })
       
    })
})