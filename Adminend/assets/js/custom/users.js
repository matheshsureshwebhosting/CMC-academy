var db = firebase.firestore();

db.collection("users")
    .orderBy("date", "desc").get().then((snap) => {
        data=[]
        snap.forEach((doc) => {
            console.log(doc.data())
            data.push(doc.data())
            document.getElementById("users").innerHTML += "<tr class='newcourse1'><td>" + doc.data().firstname + " " + doc.data().lastname + "</td><td>" + doc.data().indosnumber + "</td><td>" + doc.data().email + "</td><td>" + doc.data().phonenumber
                + "</td><td>" + doc.data().dob + "</td><td>"
        })
        
        if (data.length != 0) {
            var items = $("#users .newcourse1");
            var numItems = data.length;
    
            var perPage = 5;
    
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