var courseid = localStorage.getItem("courseid")
var batchno = localStorage.getItem("batchno")
document.getElementById("sendcertficate").addEventListener("click", async () => {
    var timetable = document.getElementById("timetablefile").files[0]
    var purchasecourse = await purchasecourses()
    var getusers = await getUsers(purchasecourse)
    var timetablelink = await timeTableLink(timetable)
    var courseinfo = await courseInfo()
    var sendemail = await sendEmail(getusers,courseinfo, timetablelink)
    window.location.replace("/timetable")
  

})

purchasecourses = async () => {
    var purchasecourses = new Promise(async (resolve, reject) => {
        await db.collection("purchasecourses").get().then((snap) => {
            var purchasecourses = []
            snap.forEach((doc) => {
                if (doc.data() !== undefined) {
                    if (doc.data().coureseid === courseid && doc.data().batch === batchno) {
                        purchasecourses.push(doc.data().userid)
                    }
                }
            })
            return resolve(purchasecourses)
        })
    })
    return await purchasecourses
}

getUsers = async (usersid) => {
    var getUsers = new Promise(async (resolve, reject) => {
        var users = []
        for (var i = 0; i < usersid.length; i++) {
            await db.collection("users").doc(usersid[i]).get().then((doc) => {
                if (doc.data() !== undefined) {
                    users.push(doc.data())
                }
            })
        }
        return resolve(users)

    })
    return await getUsers
}

timeTableLink = async (timetable) => {
    var timeTableLink = new Promise(async (resolve, reject) => {
        var path = `timetables/${courseid}/${batchno}/`
        var timetablename = `${Date.now().toString()}.jpeg`
        var storageRef = await firebase.storage().ref(path + timetablename);
        await storageRef.put(timetable).then(function (snapshot) {
            console.log('Uploaded a blob or file!');
            storageRef.getDownloadURL().then(function (url) {
                return resolve(resolve(url))
            })
        });

    })
    return await timeTableLink
}


sendEmail = async (user,courseinfo, timetable) => {    
    var mailtemplate = `
    <p>Your ${courseinfo} Time Table</p>
    ${timetable}
    
    `
    var sendEmail = new Promise(async (resolve, reject) => {
        var data = []
        for (var i = 0; i < user.length; i++) {
            var email = user[i].email
            axios.post("/timetablesend", {
                email: email,
                mailtemplate: mailtemplate
            }).then((res) => {
                if (res.data) {
                    data.push(res.data)
                }
            }).catch((error) => {
                data.push(false)
            })
        }
        console.log(data)
        return resolve(true)

    })
    return await sendEmail
}

courseInfo = async () => {
    var courseInfo = new Promise(async (resolve, reject) => {
        await db.collection("newcourse").doc(courseid).get().then((doc) => {
            return resolve(doc.data().title)
        }).catch((error) => {
            return resolve(false)
        })

    })
    return await courseInfo
}