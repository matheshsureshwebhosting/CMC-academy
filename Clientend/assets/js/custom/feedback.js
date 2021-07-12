var db = firebase.firestore();
var userid = sessionStorage.getItem("userid")

document.getElementById("sendfeedback").addEventListener("click", () => {
    var feedback = document.getElementById("feedback").value
    if (feedback == 0) {
        document.getElementById("errordiv").innerHTML +=
            `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            Please Provide Valid Feedback
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `
    }
    else {
        document.getElementById("sendfeedback").innerHTML = " <span class='spinner-border spinner-border-sm mr-2' role='status'style='padding: 7px;' aria-hidden='true'></span>Please Wait..."
        db.collection("users").doc(userid).get().then((doc) => {
            db.collection("feedback").doc().set({
                feedback: feedback,
                userid: userid,
                name:`${doc.data().firstname +" "+ doc.data().lastname}`,
            }).then(() => {
                toastr["success"]("Feedback Added Successfully...");
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            })
        })

    }





})

