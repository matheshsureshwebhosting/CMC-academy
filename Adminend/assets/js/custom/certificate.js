var db = firebase.firestore()
db.collection("certificates").get().then((snap) => {
    var data = []

    snap.forEach(async (doc) => {
        if (doc.data() != undefined) {
            data.push(doc.data())
            document.getElementById("newfaculty").innerHTML +=
                `
        <tr class='newfaculty1'>
        <td id='name${doc.id}'>Please Wait..</td>
        <td id='email${doc.id}'>Please Wait..</td>
        <td id='course${doc.id}'>Please Wait..</td>
        <td id='coursestatus${doc.id}'>${doc.data().status}</td>
        <td >${doc.data().certificate != null ? `<a href='${doc.data().certificate}' target='_blank' >Download</a>` : `<a href='javascript:void(0)'  >No Certificate</a>`}</td>
        <td id='${doc.id}'>${doc.data().certificate == null ? `<button type="button" class="btn btn-success" id='${doc.id}' value='${doc.data().userid}' data-toggle="modal"
        data-target="#examplefacultyModal"  onclick='create(this)'  >
        Create Certificate
     </button>` : `<button type="button" class="btn btn-info" id='${doc.id}' value='${doc.data().userid}' data-toggle="modal"
     data-target="#examplefacultyModal"  onclick='create(this)'  >
     Edit Certificate
  </button><button class='btn btn-danger ml-4' id='${doc.id}' value='${doc.data().userid}' onclick='del(this)'><i class='fa fa-trash-o aria-hidden='true></i> Delete</button>`}  </td>
        </tr>
        `
            await db.collection("users").doc(`${doc.data().userid}`).get().then((docs) => {
                if (docs.data() !== undefined) {
                    document.getElementById(`name${doc.id}`).innerHTML = `${docs.data().firstname} ${docs.data().lastname}`
                    document.getElementById(`email${doc.id}`).innerHTML = `${docs.data().email}`
                }

            })
            await db.collection("newcourse").doc(`${doc.data().coureseid}`).get().then((docs) => {
                if (docs.data() !== undefined) {
                    document.getElementById(`course${doc.id}`).innerHTML = `${docs.data().title}`
                }
            })
        }

    })
    if (data.length != 0) {
        var items = $(".newfaculty .newfaculty1");
        var numItems = data.length;

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
    
    if (data.length !== 0) {
        document.getElementById("facultynoti").style.display = "none"
    }

})


document.getElementById("newcertificatebtn").addEventListener("click", async () => {
    var courseandcertificateid = localStorage.getItem("courseandcertificateid")
    var certificateimage = document.querySelector("#fimage").files[0]
    var path = `certificate/${courseandcertificateid}/`
    var imagename = Date.now().toString() + ".jpeg"
    var storageRef = firebase.storage().ref(path + imagename);
    document.getElementById("newcertificatebtn").innerHTML = " <span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>Please Wait..."
    storageRef.put(certificateimage).then(function (snapshot) {
        console.log('Uploaded a blob or file!');
        storageRef.getDownloadURL().then(function (url) {
            console.log(url)
            var a = {
                certificate: url, status: "Completed"
            }
            db.collection("certificates").doc(courseandcertificateid).update(a).then(() => {
                console.log("Certificate Uploaded")
                toastr["success"]("Certificate Uploaded Successfully..");
                localStorage.removeItem("courseandcertificateid")
                localStorage.removeItem("certificatesid")
                setTimeout(() => { window.location.reload() }, 1000)
            })

        })
    });


})

create = async (e) => {
    var courseandcertificateid = e.id
    // var useruserid = e.value

    localStorage.setItem("courseandcertificateid", courseandcertificateid)



    // var userinfo = await db.collection("users").doc(`${useruserid}`).get().then((docs) => {
    //     if (docs.data() !== undefined) {
    //         return docs.data()
    //     } else {
    //         return false
    //     }
    // })
    // var courseinfo = await db.collection("newcourse").doc(`${courseandcertificateid}`).get().then((docs) => {
    //     if (docs.data() !== undefined) {
    //         return docs.data()
    //     } else {
    //         return false
    //     }
    // })
    // var { firstname, lastname, email, profilepic } = userinfo
    // var { title, subheading } = courseinfo
    // var newcertificate = {
    //     username: `${firstname} ${lastname}`,
    //     email: email,
    //     profilepic: profilepic,
    //     coursetitle: title,
    //     coursesubtitle: subheading,
    //     useruserid: useruserid,
    //     courseid: courseandcertificateid,
    //     certificateid: courseandcertificateid
    // }
    // senddata(newcertificate)
    // theEntry = "CMC"
    // theChannel = "CMC_certificate_generator"

    // const pubnub = new PubNub({
    //     publishKey = "pub-c-091a607a-438c-49ef-89c7-93056c1a5541",
    //     subscribeKey = "sub-c-c64d8ca8-d350-11eb-b6c2-0298fc8e4944",
    //     uuid = "sec-c-NGY3NzRmNTgtNjg2OS00MzJhLTk1MDMtMjZmZDE1NTJjZDRm"
    // });

    // pubnub.addListener({
    //     message: function (event) {
    //         console.log(event)
    //         displayMessage('[MESSAGE: received]',
    //             event.message.userid + ': ' + event.message.name);
    //     },
    //     presence: function (event) {
    //         displayMessage('[PRESENCE: ' + event.action + ']',
    //             'uuid: ' + event.uuid + ', channel: ' + event.channel);
    //     },
    //     status: function (event) {
    //         displayMessage('[STATUS: ' + event.category + ']',
    //             'connected to channels: ' + event.affectedChannels);

    //         if (event.category == 'PNConnectedCategory') {
    //             senddata(theEntry, 'Harmless.');
    //         }
    //     }
    // });

    // pubnub.subscribe({
    //     channels: ['CMC_certificate_generator'],
    //     withPresence: true
    // });
}

del = async (e) => {
    var certificateid = e.id
    await db.collection("certificates").doc(`${certificateid}`).update(
        {
            certificate: null,
            status: "Processing"
        }
    ).then(() => {
        alert("Deleted")
        window.location.reload()
    }).catch((error) => {
        if (error) {
            alert("Something Wrong")
            window.location.reload()
        }
    })
}

// senddata = function (newcertificate) {
//     var { username, email, profilepic, coursetitle, coursesubtitle, useruserid, courseid, certificateid } = newcertificate
//     pubnub.publish({
//         channel: theChannel,
//         message: { "update": "", 'username': username, 'email': email, 'profilepic': profilepic, 'coursetitle': coursetitle, 'coursesubtitle': coursesubtitle, 'useruserid': useruserid, 'courseid': courseid, 'certificateid': certificateid }
//     },
//         function (status, response) {
//             if (status.error) {

//             }
//             else {
//                 displayMessage('[PUBLISH: sent]',
//                     'timetoken: ' + response.timetoken);
//             }
//         });

// };

// displayMessage = function (messageType, aMessage) {
//     console.log(messageType, aMessage)
// }
