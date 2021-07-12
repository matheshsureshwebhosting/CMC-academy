var db = firebase.firestore();

document.getElementById("exdiscount").addEventListener("click", async () => {
    document.getElementById("exdiscount").innerHTML = " <span class='spinner-border spinner-border-sm mr-2' role='status'style='padding: 7px;' aria-hidden='true'></span>Please Wait..."
    var discountex = document.getElementById("discountex").value
    db.collection("discount").doc("existing_user").set({
        discount: Number(discountex),
        name: "excisting"
    }).then(() => {
        window.location.reload()
    })
})


document.getElementById("cartdiscount").addEventListener("click", async () => {

    document.getElementById("cartdiscount").innerHTML = " <span class='spinner-border spinner-border-sm mr-2' role='status'style='padding: 7px;' aria-hidden='true'></span>Please Wait..."
    var status = []
    for (var i = 1; i <= 10; i++) {
        var docid = i.toString()
        var discount = document.getElementById("discount" + i).value
        await db.collection("discount").doc(docid).set({
            discount: Number(discount)
        }).then(() => {
            status.push(true)
        }).catch((error) => {
            console.log(error.message)
        })
    }
    if (status.length == 10) {
        window.location.reload()
    }

})





db.collection("discount").get().then(async (snap) => {
    var data = []
    snap.forEach(async (doc) => {
        if (doc.data().name != "excisting") {
            if (doc.data().discount != undefined) {
                data.push({ discount: doc.data().discount, discountid: doc.id })
            }
        } else {
            if (doc.data().discount != undefined) {
                document.getElementById("discountex").value = doc.data().discount
            }
        }

    })
    console.log(data)
    if (data.length != 0) {
        for (var i = 0; i < data.length; i++) {
            document.getElementById("discount" + data[i].discountid).value = data[i].discount
        }
    }
})