var db = firebase.firestore();

db.collection("purchasecourses").get().then((snap) => {
    purchasedata=[]
    snap.forEach((doc) => {
        console.log(doc.data())
        purchasedata.push(doc.data())
        db.collection("users").doc(doc.data().userid).get().then((docs) => {
            console.log(docs.data())
            db.collection("newcourse").doc(doc.data().coureseid).get().then((docss) => {
                console.log(docss.data())

                document.getElementById("purchaseitem").innerHTML += `
                    <tr>
                        <td>${docs.data().firstname} ${docs.data().lastname}</td>
                        <td class="d-none d-md-table-cell">${docss.data().title}</td>
                        <td class="ongoing">${doc.data().date}</td>
                        <td class="ongoing">${doc.data().status}</td>
                    </tr>
            `
            })
        })
    })
    console.log(purchasedata.length)
    if (purchasedata.length != 0) {
        var items = $("#purchaseitem .newfaculty1");
        var numItems = purchasedata.length;

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
})