var db = firebase.firestore();
var userid = sessionStorage.getItem("userid")

db.collection("purchasecourses").where("userid", "==", userid).get().then(async (snap) => {
    snap.forEach((doc) => {
        db.collection("newcourse").doc(doc.data().coureseid).get().then(async (docs) => {          
            if (docs.data() != undefined) {            
                document.getElementById("coursenoti").style.display = "none"
                document.getElementById("purchaseitem").innerHTML += `
            <tr>
                <td>${docs.data().title}</td>
                <td class="d-none d-md-table-cell">${doc.data().batchdate}</td>
                <td class="ongoing" id="status${docs.id}"></td>
            </tr>
            `
                var coursestart = doc.data().batchdate
                var today = await toDay()
                var courseendDate = await findFutureDate(coursestart, Number(docs.data().duration))
                if (coursestart > today) {
                    console.log(1)
                    coursestatusupdate(doc.id,doc.data().coureseid, "Course Not Started")
                    return document.getElementById(`status${docs.id}`).innerHTML = "Course Not Started"
                } else if (today < courseendDate) {
                    console.log(2)
                    coursestatusupdate(doc.id,doc.data().coureseid, "Course Ongoing")
                    return document.getElementById(`status${docs.id}`).innerHTML = "course ongoing"
                } else if (today >= courseendDate) {
                    console.log(3)
                    coursestatusupdate(doc.id,doc.data().coureseid, "Course Completed")
                    return document.getElementById(`status${docs.id}`).innerHTML = "Course Completed"
                }else{
                    console.log(4)
                }
            }
            // else {
            //     document.getElementById("coursenoti").style.display = "block"
            // }

        })
    })
})

findFutureDate = (date, days) => {
    var res = new Date(date);
    res.setDate(res.getDate() + days);
    const monthsandday = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
        "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"]
    var future = res.getFullYear() + "-" + (monthsandday[res.getMonth() + 1]) + "-" + monthsandday[res.getDate()]
    return future;
}




coursestatusupdate = async (purchasecourseid,coureseid, status) => {    
    db.collection("purchasecourses").doc(purchasecourseid).update({
        status: status
    }).then(() => {
        console.log("updated");
    })

    var today = await toDay()
    if (status == "Course Completed") {
        db.collection("certificates").doc(coureseid).set({
            coureseid: coureseid,
            status: "Processing",
            userid: userid,
            date: today,
            certificate: null
        }).then(() => {
            console.log("updated");
        })
    }

}


toDay = () => {
    var date = new Date()
    const monthsandday = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
        "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"]
    var today = date.getFullYear() + "-" + (monthsandday[date.getMonth() + 1]) + "-" + monthsandday[date.getDate()]
    return today
}