var userid = localStorage.getItem("userid")
var db = firebase.firestore()
document.getElementById("checkoutbtn").addEventListener("click", async () => {
    var totalcheckout = document.getElementById("checkouttotal").innerHTML
    const mycartsitems = document.querySelectorAll(".mycartsitems")
    const mycartsitem = []
    for (var i = 0; i < mycartsitems.length; i++) {
        mycartsitem.push(mycartsitems[i].id)
    }
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
    const updatemycourse = await mycourse(mycartsitem, payamount)
    if (updatemycourse == false) return toastr["error"]("Try Again..");
    toastr["success"]("Course Purchased Succesfully..");
    return window.location.replace("/dashboard/mycourses")
})

pay = async (payid) => {
    const pay = new Promise(async (resolve, reject) => {
        var options = {
            "key": "rzp_test_Bk7kYc5nwLJGlb",  //Enter your razorpay key
            "currency": "INR",
            "name": "Razorpay",
            "description": "Plan Subcription",
            "image": "https://previews.123rf.com/images/subhanbaghirov/subhanbaghirov1605/subhanbaghirov160500087/56875269-vector-light-bulb-icon-with-concept-of-idea-brainstorming-idea-illustration-.jpg",
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

mycourse = async (mycartsitem, payamount) => {
    const mycourse = new Promise(async (resolve, reject) => {
        const status = []
        for (var i = 0; i < mycartsitem.length; i++) {
            const date = new Date()
            const monthsandday = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
                "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"]
            const day = date.getFullYear() + "-" + (monthsandday[date.getMonth() + 1]) + "-" + date.getDate()
            var time = (monthsandday[date.getHours()]) + ":" + date.getMinutes() + ":" + date.getSeconds();
            const today = day + " " + time

            await db.collection("purchasecourses").doc().set({
                userid: userid,
                coureseid: mycartsitem[i],
                date: today,
                paymentid: payamount,
                status:"ongoing"
            }).then(() => {
                status.push(true)
            }).catch((error) => {
                status.push(false)
            })
        }
        if (status.includes(false)) return resolve(false)
        return resolve(true)
    })
    return await mycourse
}

// removeMycart = async (mycartsitem) => {
//     const removeMycart = new Promise(async (resolve, reject) => {
//         const status = []
//         for (var i = 0; i < mycartsitem.length; i++) {
//             await db.collection("cart").doc(mycartsitem[i]).delete().then(() => {
//                 status.push(true)
//             }).catch((error) => {
//                 status.push(false)
//             })
//         }
//         if (status.includes(false)) return resolve(false)
//         return resolve(true)
//     })
//     return await removeMycart
// }