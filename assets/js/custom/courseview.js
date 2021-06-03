var db = firebase.firestore();

var courseid = localStorage.getItem("courseid")


db.collection("newcourse").doc(courseid).get().then((doc) => {
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
                            <a href="/dashboard"> <i class="fa fa-home"></i> </a>
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
                                            <select name="" id="">
                                                <option value="">Select Start Date/Time</option>
                                            </select>
                                        </div>
                                    </div>
                                    <ul class="tab-group row">
                                        <li class="tab col-lg col-3" onclick="openCity(event, 'Eligibility')"><a
                                        href="#">Eligibility</a></li>
                                        <li class="tab col-lg col-6" onclick="openCity(event, 'Documents')"><a
                                        href="#">Documents Required</a></li>
                                        <li class="tab col-lg col-6" onclick="openCity(event, 'Details')"><a
                                        href="#">Details</a></li>
                                    </ul>
                                        <div id="Eligibility" class="tabcontent">
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
                                    <div class="row float-lg-right px-3 mt-3 ml-lg-1">
                                        <button class="btn btn-outline-primary" id="${doc.id}" onclick='buy(this.id)'>Buy Now</button>
                                    </div>
                                    <div class="row float-lg-right px-3 mt-3">
                                        <button class="btn btn-outline-primary" id="${doc.id}" onclick='cart(this.id)'>Add to Cart <i
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
})


db.collection("newcourse").get().then((snap) => {
    snap.forEach((doc) => {
        if (doc.id == courseid) {
            document.getElementById("coursename").innerHTML += `
            <li id="${doc.id}" class="active" onclick='view(this.id)'>
                <a href="javascript:void(0)" class="waves-effect waves-dark">
                    <span class="pcoded-mtext">${doc.data().category}</span>
                    <span class="pcoded-mcaret"></span>
                </a>
            </li >
            `
        }
        else {
            document.getElementById("coursename").innerHTML += `
        <li id="${doc.id}" onclick='view(this.id)'>
            <a href="javascript:void(0)" class="waves-effect waves-dark">
                <span class="pcoded-mtext">${doc.data().category}</span>
                <span class="pcoded-mcaret"></span>
            </a>
        </li >
        `
        }


    })
})



db.collection("newcourse").get().then((snap) => {
    var data = []
    snap.forEach((doc) => {
        data.push(doc.data().category)
    })
    document.getElementById("searchcourse").addEventListener("keyup", (e) => {
        var searchvalue = e.target.value
        for (var i = 0; i < data.length; i++) {
            var finalservice = []
            if (data[i].toLowerCase().includes(searchvalue.toLowerCase())) {
                finalservice.push(data[i])
            }
            if (finalservice.length != 0) {
                db.collection("newcourse").where("category", "==", finalservice[0]).get().then((snaps) => {
                    snaps.forEach((docs) => {
                        console.log(docs.data());
                        document.getElementById("coursename").innerHTML = ""
                        document.getElementById("coursename").innerHTML += `
                            <li id="${docs.id}" onclick='view(this.id)'>
                                <a href="javascript:void(0)" class="waves-effect waves-dark">
                                    <span class="pcoded-mtext">${docs.data().category}</span>
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
    localStorage.setItem("courseid", e)
    window.location.replace("/dashboard")
}
cart = (e) => {
    db.collection("newcourse").doc(e).get().then((doc) => {
        db.collection("cart").doc().set({
            category: doc.data().category,
            title: doc.data().title,
            fees: doc.data().ofees,
            userid: "12346"
        }).then(() => {
            console.log("Cart Added Successfully...");
            setTimeout(() => { window.location.reload() }, 1000)
        })
    })
}


buy = (e) => {
    db.collection("newcourse").doc(e).get().then((doc) => {
        db.collection("cart").doc().set({
            category: doc.data().category,
            title: doc.data().title,
            fees: doc.data().ofees,
            userid: "12346"
        }).then(() => {
            console.log("Cart Added Successfully...");
            setTimeout(() => { window.location.reload() }, 1000)
        })
    })
}


