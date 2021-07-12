var userid = sessionStorage.getItem("userid")
var db = firebase.firestore()


document.getElementById("checkoutbtn").addEventListener("click", async () => {
    var totalcheckout = document.getElementById("checkouttotal").innerHTML
    const mycartsitems = document.querySelectorAll(".mycartsitems")
    const mycartsitem = []
    const mycardid = []

    for (var i = 0; i < mycartsitems.length; i++) {
        mycartsitem.push(mycartsitems[i].id)
        mycardid.push(mycartsitems[i].firstElementChild.id)
    }
    toastr["info"]("Please Wait");
    var url = '/razorpay/payment';
    const razorpay = await axios.post(url, {
        amount: totalcheckout
    }, {
        headers: {
            clientuserid: userid
        }
    }).then((res) => {
        if (res.data.status == "success") {
            return res.data.sub.id
        } else {
            return false
        }
    }).catch((error) => {
        return false
    })
    if (razorpay == false) return toastr["error"]("Something Wrong");
    const payamount = await pay(razorpay)
    const updatemycourse = await mycourse(mycartsitem, payamount, mycardid)
    if (updatemycourse == false) return toastr["error"]("Try Again..");

    toastr["success"]("Course Purchased Succesfully..");
    return window.location.replace("/dashboard/mycourses")
})

pay = async (payid) => {
    const pay = new Promise(async (resolve, reject) => {
        var options = {
            "key": "rzp_test_Bk7kYc5nwLJGlb",  //Enter your razorpay key
            "currency": "INR",
            "name": "CMC MARITIME ACADEMY",
            "description": "Course Purchase",
            "image": "/img/logo/cmc_logo.png",
            "order_id": payid,
            "handler": function (response) {
                return resolve(response.razorpay_payment_id)
            },
            "theme": {
                "color": "#227254"
            }
        };
        var rzp = new Razorpay(options);
        rzp.open();
    })
    return await pay
}

mycourse = async (mycartsitem, payamount, mycardid) => {
    const mycourse = new Promise(async (resolve, reject) => {
        const status = []
        for (var i = 0; i < mycartsitem.length; i++) {
            const date = new Date()
            const monthsandday = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
                "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"]
            const day = date.getFullYear() + "-" + (monthsandday[date.getMonth() + 1]) + "-" + date.getDate()
            var time = (monthsandday[date.getHours()]) + ":" + date.getMinutes() + ":" + date.getSeconds();
            const today = day + " " + time
            const mycarts = await db.collection("cart").doc(mycardid[i]).get().then(async (docss) => {
                if (docss.data() !== undefined) {
                    return docss.data()
                }
            })
            var purchasecourses = {
                userid: userid,
                coureseid: mycartsitem[i],
                date: today,
                paymentid: payamount,
                status: "Not Started",
                batch: mycarts.batch,
                batchdate: mycarts.startdate
            }
            await db.collection("purchasecourses").doc().set(purchasecourses).then(() => {
                status.push(true)
            }).catch((error) => {
                status.push(false)
            })
            const coursedata = await db.collection("newcourse").doc(mycartsitem[i]).get().then(async (docs) => {
                if (docs.data() !== undefined) {
                    return docs.data()
                }
            })
            const userinfo = await db.collection("users").doc(userid)

            const myinfo = await userinfo.get().then(async (doc) => {
                if (doc.data() != undefined) {
                    return doc.data()
                }
            })
            const myinfoupdate = await userinfo.update({
                purchasecourses: firebase.firestore.FieldValue.arrayUnion(mycartsitem[i])
            }).then(() => { return true }).catch((error) => { return false })
            if (myinfoupdate === true) {
                const sendEmail = await sendmail(coursedata, myinfo)
                console.log(sendEmail, mycardid)
                const removecart = await removeMycart(mycardid[i])
                return resolve(removecart)
            } else {
                return resolve(true)
            }

        }
        if (status.includes(false)) return resolve(false)
        return resolve(true)
    })
    return await mycourse
}

sendmail = async (data, userdata) => {
    var { email } = userdata
    var { title } = data
    document.getElementById("mailcoursename").innerHTML = title
    const mailtemplate = await document.getElementById("purchasetemplate").innerHTML
    const sendmail = await axios.post("/mail/coursepurchasesend", {
        email: email,
        mailtemplate: mailtemplate
    }).then((res) => {
        return res.data
    }).catch((error) => {
        return false
    })
    return sendmail
}





removeMycart = async (mycartsitem) => {
    const removeMycart = new Promise(async (resolve, reject) => {
        await db.collection("cart").doc(mycartsitem).delete().then(() => {

            return resolve(true)
        }).catch((error) => {

            return resolve(false)
        })
    })
    return await removeMycart
}

