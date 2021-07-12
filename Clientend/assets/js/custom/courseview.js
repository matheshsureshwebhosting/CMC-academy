var db = firebase.firestore();

var courseid = sessionStorage.getItem("courseid")

if (courseid !== null) {
    db.collection("newcourse").doc(courseid).get().then((doc) => {
        if (doc.data() != undefined) {

            // document.getElementById("coursenoti").style.display = "none"
            document.getElementById("courseview").innerHTML += `
            <div class="pcoded-content">
            <!-- Page-header start -->
            <div class="page-header">
                <div class="page-block">
                    <div class="row align-items-center">
                        <div class="col-md-8">
                            <div class="page-header-title">
                                <h5 class="m-b-10">${doc.data().category}</h5>
                                <p class="m-b-0">Welcome to CMC Maritime Academy</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="/"> <i class="fa fa-home"></i> </a>
                                </li>
                                <li class="breadcrumb-item"><a href="#!">Cart</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Page-header end -->
            <div class="pcoded-inner-content">
                <div class="main-body">
                    <div class="page-wrapper">
                        <div class="page-body">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="card">
                                        <div class="card-header">
                                            <h5>${doc.data().title}</h5>
                                            <span>${doc.data().subheading}</span>
                                            <div class="card-header-right"
                                                style="display: flex; align-items: center;">
                                                <span class="fee"
                                                    style="font-weight: 600; font-size: larger;"> Rs.
                                                    ${doc.data().ofees}</span>
                                            </div>
                                        </div>
                                        <div class="card-block">
                                            <div class="row mb-4">
                                                <div class="col-lg">
                                                    <h5>Duration : <span>${doc.data().duration} Days</span></h5>
                                                </div>
                                                <div class="col-lg">
                                                    <h5>Mode : <span>${doc.data().mode}</span></h5>
                                                </div>
                                                <div class="col-lg mt-2 mt-lg-0">
                                                    <select name="" id="${doc.id}optiontag">
                                                        
                                                    </select>
                                                </div>
                                            </div>
                                            <ul class="tab-group row">
                                                <li class="tab col-lg col-3 tablinks" onclick="openCity(event, 'Eligibility')"><a
                                                href="#">Eligibility</a></li>
                                                <li class="tab col-lg col-6 tablinks" onclick="openCity(event, 'Documents')"><a
                                                href="#">Documents Required</a></li>
                                                <li class="tab col-lg col-6 tablinks" onclick="openCity(event, 'Details')"><a
                                                href="#">Details</a></li>
                                            </ul>
                                                <div id="Eligibility" class="tabcontent" style="display:block;">
                                                <ul id="eli">
                                        
                                                    </ul>
                                                </div>
                                                <div id="Documents" class="tabcontent">
                                                <ul id="doc">
                                                
                                            </ul>
                                                </div>
                                                <div id="Details" class="tabcontent">
                                                <ul id="de">
                                                        
                                                    </ul>
                                                </div>
                                            <div class="row float-lg-right px-3 mt-3 ml-lg-1" id="cartadd">
                                                <button class="btn btn-outline-primary" id="${doc.id}" onclick='buy(this.id)'>Buy Now</button>
                                            </div>
                                            <div class="row float-lg-right px-3 mt-3" id="buyadd">
                                                <button class="btn btn-outline-primary" id="${doc.id}" onclick='addcart(this.id)'>Add to Cart <i
                                                        class="fa fa-shopping-cart"
                                                        aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
            `

            var elidata = `${doc.data().eligibility}`
            var finalelidata = elidata.split("\n");
            for (var i = 0; i < finalelidata.length; i++) {
                document.getElementById("eli").innerHTML +=
                    `  <li><i class="fas fa-angle-right mr-3"></i>${finalelidata[i]}</li>
                `

            }
            var docdata = `${doc.data().documents}`
            var finaldocdata = docdata.split("\n");
            for (var i = 0; i < finaldocdata.length; i++) {
                document.getElementById("doc").innerHTML +=
                    `  <li><i class="fas fa-angle-right mr-3"></i>${finaldocdata[i]}</li>
                `

            }
            var dedata = `${doc.data().description}`
            var finaldedata = dedata.split("\n");
            for (var i = 0; i < finaldedata.length; i++) {
                document.getElementById("de").innerHTML +=
                    `  <li><i class="fas fa-angle-right mr-3"></i>${finaldedata[i]}</li>
                `

            }
            for (var i = 0; i < doc.data().startdate.length; i++) {
                document.getElementById(`${doc.id}optiontag`).innerHTML += `
                <option value="${doc.data().startdate[i].date}/${doc.data().startdate[i].batch}">${doc.data().startdate[i].date} (Batch - ${doc.data().startdate[i].batch})</option>
                `
            }


        }
        // else {
        //     document.getElementById("coursenoti").style.display = "block"
        // }

    })
} else {
    db.collection("newcourse").orderBy("date", "asc").get().then((snaps) => {
        snaps.forEach((docs) => {

            document.getElementById("subcourseview").innerHTML += `
        <div class="pcoded-content" style="margin-bottom:-70px">
        <!-- Page-header start -->
        
        <!-- Page-header end -->
        <div class="pcoded-inner-content">
            <div class="main-body">
                <div class="page-wrapper">
                    <div class="page-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h5>${docs.data().title}</h5>
                                        <span>${docs.data().subheading}</span>
                                        <div class="card-header-right"
                                            style="display: flex; align-items: center;">
                                            <span class="fee"
                                                style="font-weight: 600; font-size: larger;"> Rs.
                                                ${docs.data().ofees}</span>
                                        </div>
                                    </div>
                                    <div class="card-block">
                                        <div class="row mb-4">
                                            <div class="col-lg">
                                                <h5>Duration : <span>${docs.data().duration} Days</span></h5>
                                            </div>
                                            <div class="col-lg">
                                                <h5>Mode : <span>${docs.data().mode}</span></h5>
                                            </div>
                                            <div class="col-lg mt-2 mt-lg-0">
                                                <select  id="${docs.id}optiontag">                                                
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div class="row float-lg-right px-3 mt-3 ml-lg-1">
                                            <button class="btn btn-outline-primary" id="${docs.id}" onclick='buysub(this.id)'>Buy Now</button>
                                        </div>
                                        <div class="row float-lg-right px-3 mt-3">
                                            <button class="btn btn-outline-primary" id="${docs.id}" onclick='cartsub(this.id)'>Add to Cart <i
                                                    class="fa fa-shopping-cart"
                                                    aria-hidden="true"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
        `

            document.getElementById(`${docs.id}optiontag`).innerHTML = ""
            for (var i = 0; i < docs.data().startdate.length; i++) {
                document.getElementById(`${docs.id}optiontag`).innerHTML += `
                    <option value="${docs.data().startdate[i].date}/${docs.data().startdate[i].batch}">${docs.data().startdate[i].date} (Batch - ${docs.data().startdate[i].batch})</option>
                    `
            }

        })



    })

}

db.collection("newcourse").get().then((snap) => {
    snap.forEach((doc) => {
        if (doc.data().type !== "Packages") {
            if (doc.id == courseid) {
                document.getElementById("coursename").innerHTML += `
                <li id="${doc.id}" class="active" onclick='view(this.id)'>
                    <a href="javascript:void(0)" class="waves-effect waves-dark">
                        <span class="pcoded-mtext">${doc.data().title}</span>
                        <span class="pcoded-mcaret"></span>
                    </a>
                </li >
                `
            }
            else {
                document.getElementById("coursename").innerHTML += `
            <li id="${doc.id}" onclick='view(this.id)'>
                <a href="javascript:void(0)" class="waves-effect waves-dark">
                    <span class="pcoded-mtext">${doc.data().title}</span>
                    <span class="pcoded-mcaret"></span>
                </a>
            </li >
            `
            }
        }

    })
})



db.collection("newcourse").get().then((snap) => {
    snap.forEach((doc) => {
        if (doc.data().type == "Packages") {
            if (doc.id == courseid) {
                document.getElementById("coursename").innerHTML += `
                <li id="${doc.id}" class="active" onclick='view(this.id)'>
                    <a href="javascript:void(0)" class="waves-effect waves-dark">
                        <span class="pcoded-mtext">${doc.data().title}</span>
                        <span class="pcoded-mcaret"></span>
                    </a>
                </li >
                `
            }
            else {
                document.getElementById("coursename").innerHTML += `
            <li id="${doc.id}" onclick='view(this.id)'>
                <a href="javascript:void(0)" class="waves-effect waves-dark">
                    <span class="pcoded-mtext">${doc.data().title}</span>
                    <span class="pcoded-mcaret"></span>
                </a>
            </li >
            `
            }
        }

    })
})


db.collection("newcourse").get().then((snap) => {
    var data = []
    snap.forEach((doc) => {
        data.push(doc.data().title)
    })
    document.getElementById("searchcourse").addEventListener("keyup", (e) => {
        var searchvalue = e.target.value
        for (var i = 0; i < data.length; i++) {
            var finalservice = []
            if (data[i].toLowerCase().includes(searchvalue.toLowerCase())) {
                finalservice.push(data[i])
            }
            if (finalservice.length != 0) {
                db.collection("newcourse").where("title", "==", finalservice[0]).get().then((snaps) => {
                    snaps.forEach((docs) => {
                        document.getElementById("coursename").innerHTML = ""
                        document.getElementById("coursename").innerHTML += `
                            <li id="${docs.id}" onclick='view(this.id)'>
                                <a href="javascript:void(0)" class="waves-effect waves-dark">
                                    <span class="pcoded-mtext">${docs.data().title}</span>
                                    <span class="pcoded-mcaret"></span>
                                </a>
                            </li >
                                    `
                    })
                })

            }




        }

    })

})
















view = (e) => {
    sessionStorage.setItem("courseid", e)
    window.location.replace("/dashboard")
}
addcart = async (e) => {
    var userid = sessionStorage.getItem("userid")
    if (userid == null) {
        var batchdate = document.getElementById(`${e}optiontag`).value
        var startdatedata = batchdate.split("/")
        var cartArray = []
        db.collection("newcourse").doc(e).get().then((doc) => {
            var newcart = {
                category: doc.data().category,
                title: doc.data().title,
                fees: doc.data().ofees,
                userid: userid,
                courseid: e,
                startdate: startdatedata[0],
                batch: startdatedata[1]
            }
            cartArray.push(newcart)
            if (localStorage.getItem("cart") !== null) {
                var savedcart = JSON.parse(localStorage.getItem("cart"))
                savedcart.push(newcart)
                localStorage.setItem("cart", JSON.stringify(savedcart))
                toastr["success"]("Cart Added Successfully...");

            } else {
                localStorage.setItem("cart", JSON.stringify(cartArray))
                toastr["success"]("Cart Added Successfully...");
            }
        })
    } else {
        const checkcpurse = await db.collection("users").doc(userid).get().then((doc) => {
            if (doc.data() !== undefined) {
                return doc.data()
            }
        })
        const mycourse = checkcpurse.purchasecourses
        if (mycourse.includes(e)) {
            toastr["info"]("Already Purchase...")
        } else {
            var batchdate = document.getElementById(`${e}optiontag`).value
            console.log(batchdate);
            var startdatedata = batchdate.split("/")
            db.collection("newcourse").doc(e).get().then((doc) => {
                db.collection("cart").doc().set({
                    category: doc.data().category,
                    title: doc.data().title,
                    fees: doc.data().ofees,
                    userid: userid,
                    courseid: e,
                    startdate: startdatedata[0],
                    batch: startdatedata[1]
                }).then(() => {
                    toastr["success"]("Cart Added Successfully...");
                    setTimeout(() => { window.location.reload() }, 1000)
                })
            })
        }
    }
}


buy = async (e) => {
    var userid = sessionStorage.getItem("userid")
    if (userid == null) {
        var batchdate = document.getElementById(`${e}optiontag`).value
        var startdatedata = batchdate.split("/")
        var cartArray = []
        db.collection("newcourse").doc(e).get().then((doc) => {
            var newcart = {
                category: doc.data().category,
                title: doc.data().title,
                fees: doc.data().ofees,
                userid: userid,
                courseid: e,
                startdate: startdatedata[0],
                batch: startdatedata[1]
            }
            cartArray.push(newcart)
            if (localStorage.getItem("cart") !== null) {
                var savedcart = JSON.parse(localStorage.getItem("cart"))
                savedcart.push(newcart)
                localStorage.setItem("cart", JSON.stringify(savedcart))
                toastr["success"]("Cart Added Successfully...");
            } else {
                localStorage.setItem("cart", JSON.stringify(cartArray))
                toastr["success"]("Cart Added Successfully...");
            }
        })
    } else {
        const checkcpurse = await db.collection("users").doc(userid).get().then((doc) => {
            if (doc.data() !== undefined) {
                return doc.data()
            }
        })
        const mycourse = checkcpurse.purchasecourses
        if (mycourse.includes(e)) {
            toastr["info"]("Already Purchase...")
        } else {
            var batchdate = document.getElementById(`${e}optiontag`).value
            console.log(batchdate);
            var startdatedata = batchdate.split("/")
            db.collection("newcourse").doc(e).get().then((doc) => {
                db.collection("cart").doc().set({
                    category: doc.data().category,
                    title: doc.data().title,
                    fees: doc.data().ofees,
                    userid: userid,
                    courseid: e,
                    startdate: startdatedata[0],
                    batch: startdatedata[1]
                }).then(() => {
                    toastr["success"]("Cart Added Successfully...");
                    setTimeout(() => { window.location.replace("/viewcart") }, 1000)
                })
            })
        }
    }
}



cartsub = async (e) => {
    var userid = sessionStorage.getItem("userid")
    if (userid == null) {
        var batchdate = document.getElementById(`${e}optiontag`).value
        var startdatedata = batchdate.split("/")
        var cartArray = []
        db.collection("newcourse").doc(e).get().then((doc) => {
            var newcart = {
                category: doc.data().category,
                title: doc.data().title,
                fees: doc.data().ofees,
                userid: userid,
                courseid: e,
                startdate: startdatedata[0],
                batch: startdatedata[1]
            }
            cartArray.push(newcart)
            if (localStorage.getItem("cart") !== null) {
                var savedcart = JSON.parse(localStorage.getItem("cart"))
                savedcart.push(newcart)
                localStorage.setItem("cart", JSON.stringify(savedcart))
                toastr["success"]("Cart Added Successfully...");
            } else {
                localStorage.setItem("cart", JSON.stringify(cartArray))
                toastr["success"]("Cart Added Successfully...");
            }
        })
    } else {
        const checkcpurse = await db.collection("users").doc(userid).get().then((doc) => {
            if (doc.data() !== undefined) {
                return doc.data()
            }
        })
        const mycourse = checkcpurse.purchasecourses
        if (mycourse.includes(e)) {
            toastr["info"]("Already Purchase...")
        } else {
            var batchdate = document.getElementById(`${e}optiontag`).value
            console.log(batchdate);
            var startdatedata = batchdate.split("/")
            db.collection("newcourse").doc(e).get().then((doc) => {
                db.collection("cart").doc().set({
                    category: doc.data().category,
                    title: doc.data().title,
                    fees: doc.data().ofees,
                    userid: userid,
                    courseid: e,
                    startdate: startdatedata[0],
                    batch: startdatedata[1]
                }).then(() => {
                    toastr["success"]("Cart Added Successfully...");
                    setTimeout(() => { window.location.reload() }, 1000)
                })
            })
        }
    }
}


buysub = async (e) => {
    var userid = sessionStorage.getItem("userid")
    if (userid == null) {
        var batchdate = document.getElementById(`${e}optiontag`).value
        var startdatedata = batchdate.split("/")
        var cartArray = []
        db.collection("newcourse").doc(e).get().then((doc) => {
            var newcart = {
                category: doc.data().category,
                title: doc.data().title,
                fees: doc.data().ofees,
                userid: userid,
                courseid: e,
                startdate: startdatedata[0],
                batch: startdatedata[1]
            }
            cartArray.push(newcart)
            if (localStorage.getItem("cart") !== null) {
                var savedcart = JSON.parse(localStorage.getItem("cart"))
                savedcart.push(newcart)
                localStorage.setItem("cart", JSON.stringify(savedcart))
                toastr["success"]("Cart Added Successfully...");
            } else {
                localStorage.setItem("cart", JSON.stringify(cartArray))
                toastr["success"]("Cart Added Successfully...");
            }
        })
    } else {
        const checkcpurse = await db.collection("users").doc(userid).get().then((doc) => {
            if (doc.data() !== undefined) {
                return doc.data()
            }
        })
        const mycourse = checkcpurse.purchasecourses
        if (mycourse.includes(e)) {
            toastr["info"]("Already Purchase...")
        } else {
            var batchdate = document.getElementById(`${e}optiontag`).value
            console.log(batchdate);
            var startdatedata = batchdate.split("/")
            db.collection("newcourse").doc(e).get().then((doc) => {
                db.collection("cart").doc().set({
                    category: doc.data().category,
                    title: doc.data().title,
                    fees: doc.data().ofees,
                    userid: userid,
                    courseid: e,
                    startdate: startdatedata[0],
                    batch: startdatedata[1]
                }).then(() => {
                    toastr["success"]("Cart Added Successfully...");
                    setTimeout(() => { window.location.replace("/viewcart") }, 1000)
                })
            })
        }
    }
}

window.onload = async () => {
    if (sessionStorage.getItem("userid") !== null) {
        var cart = localStorage.getItem("cart")
        if (cart !== null) {
            var mycart = JSON.parse(cart)
            var updatedcart = []
            for (var i = 0; i < mycart.length; i++) {
                updatedcart.push({
                    batch: mycart[i].batch,
                    category: mycart[i].category,
                    courseid: mycart[i].courseid,
                    fees: mycart[i].fees,
                    startdate: mycart[i].startdate,
                    title: mycart[i].title,
                    userid: sessionStorage.getItem("userid")
                })
            }
            var mystatus = []
            for (var i = 0; i < updatedcart.length; i++) {
                var mycart = updatedcart[i]
                await db.collection("cart").doc().set(mycart).then(() => {
                    mystatus.push(true)
                }).catch((error) => { console.log(error); })
            }
            if (mystatus.length == updatedcart.length) {
                localStorage.removeItem("cart")
            }
        }
    }
}
