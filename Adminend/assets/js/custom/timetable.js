var db = firebase.firestore();

db.collection("newcourse").get().then((snap) => {
    var data = []
    snap.forEach((doc) => {
        data.push(doc.data())
        document.getElementById("timetable").innerHTML += "<tr class='newcourse1'><td>" + doc.data().title + "</td><td>" + "<button class='btn btn-danger' id=" + doc.id + " onclick='view(this.id)'><i class='fa fa-file-o aria-hidden='true></i> Send</button> <button class='btn btn-info' id=" + doc.id + " data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='create(this.id)'><i class='fa fa-pencil aria-hidden='true></i> Create</button>" + "</td></tr>"
    })
    if (data.length != 0) {
        var items = $(".timetable .newcourse1");
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
})

function create(e) {
    localStorage.setItem("courseid", e)
    window.location.replace("/timetablecreate")
}
function view(e){
    localStorage.setItem("courseid", e)
    window.location.replace("/timetableview")
}