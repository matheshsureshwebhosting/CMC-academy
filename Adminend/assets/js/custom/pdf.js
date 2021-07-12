var db = firebase.firestore();
var courseid = localStorage.getItem("courseid")
var batchno = localStorage.getItem("batchno")

db.collection("timetable").doc(courseid).collection("batchno").doc(batchno).get().then((doc) => {    
    document.getElementById("batchno").innerHTML = doc.data().coursedata.batchno
    document.getElementById("startdate").innerHTML = doc.data().coursedata.startingdate
    document.getElementById("enddate").innerHTML = doc.data().coursedata.enddate
    document.getElementById("coursename").innerHTML=doc.data().coursedata.coursename
    document.getElementById("subheading").innerHTML=doc.data().coursedata.subheading   
   for(var i=0;i<doc.data().tabledata.length;i++){       
       document.getElementById("invoicedatas").innerHTML +=
`
             <tr>
                 <td id="days"> ${doc.data().tabledata[i].days}</td>
                 <td id="firstsession"> ${doc.data().tabledata[i].firstsession}</td>
                 <td id="secondsession">${doc.data().tabledata[i].secondsession}</td>
                 ${i==0 ? `<td rowspan="7"><SPAN STYLE="writing-mode: vertical-lr;
                 -ms-writing-mode: tb-cl;
                 transform: rotate(360deg);"> B R E A K
                 </SPAN></td>`:''}
                 <td id="thirdsession">${doc.data().tabledata[i].thirdsession}</td>
                 <td id="fourthsession">${doc.data().tabledata[i].fourthsession}</td>
             </tr>
            
`
   }
})


