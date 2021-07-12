var db = firebase.firestore();
var userid = sessionStorage.getItem("userid")

db.collection("cart").where("userid", "==", userid).get().then(async (snap) => {
    var data = []
    snap.forEach((doc) => {
        data.push(Number(doc.data().fees))
        document.getElementById("cartitem").innerHTML += `
        <div class="d-flex justify-content-between align-items-center mt-3 p-2 items rounded mycartsitems" id='${doc.data().courseid}'>
        <div class="d-flex flex-row" id=${doc.id}>
            <div class="ml-2">
                <span class="font-weight-bold d-block">${doc.data().title}</span>
                <span class="spec">${doc.data().category}</span>
            </div>
        </div>
        <div class="d-flex flex-row align-items-center">
            <span class="d-block ml-5 font-weight-bold">Rs.
                ${doc.data().fees}</span>
            <i class="ti-trash ml-3 text-black-50" style="cursor: pointer;" id="${doc.id}" onclick='del(this.id)'></i>
        </div>
    </div>
       `
    })



    var total = data.reduce(function (acc, val) { return acc + val }, 0)
    var cartamount
    var percentage
    var discount
    // var cartcount = data.length.toString()
    // if (data.length <= 10) {
    //     var discountdata = await db.collection("discount").doc(cartcount).get().then((doc) => {
    //         if (doc.data() != undefined) {

    //             return doc.data()
    //         }
    //     })
    //     percentage = discountdata.discount
    //     discount = ((Number(total) * Number(percentage)) / 100)
    //     var discountamount = Number(total) - Number(discount)
    //     cartamount = discountamount
    // } else {
    //     percentage = 0
    //     discount = 0
    //     cartamount = total
    // }
    var checkeexistinguser = await db.collection("purchasecourses").where("userid", "==", userid).get().then((snap) => {
       var mydata = []
        snap.forEach((doc) => {
            if (doc.data() != undefined) {
                mydata.push(doc.id)
            }
        })
        return mydata
    })
    if (checkeexistinguser.length !=0) {
        console.log("already user");
        var cartcount = data.length.toString()        
        if (data.length <= 10) {
            var discountdata = await db.collection("discount").doc(cartcount).get().then((doc) => {
                if (doc.data() != undefined) {

                    return doc.data()
                }
            })
            percentage = discountdata.discount
            discount = ((Number(total) * Number(percentage)) / 100)
            var discountamount = Number(total) - Number(discount)
            cartamount = discountamount
        } else {
            percentage = 0
            discount = 0
            cartamount = total
        }

    } else {
        console.log("new user");
        percentage = 0
        discount = 0
        cartamount = total
    }

    document.getElementById("disnumber").innerHTML = `(${percentage} %)`
    document.getElementById("disamount").innerHTML = `Rs. ${discount}`
    document.getElementById("subtotal").innerHTML = total
    document.getElementById("finaltotal").innerHTML = cartamount
    document.getElementById("checkouttotal").innerHTML = cartamount

    if (total != 0) {
        document.getElementById("checkoutbtndiv").style.display = "block"
    } else {
        document.getElementById("checkoutbtndiv").style.display = "none"
    }

    document.getElementById("cartcount").innerHTML = data.length


})

del = (e) => {
    db.collection("cart").doc(e).delete().then(() => {
        toastr["error"]("Course Deleted");
        setTimeout(() => { window.location.reload() }, 1000)
    })

}