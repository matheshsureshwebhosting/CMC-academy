var db = firebase.firestore();

const forgotreg = document.getElementById("forgotbtn")

forgotreg.addEventListener("click", async () => {
    var email = document.getElementById("email").value;    
    if (email != "" && email != null) {
        document.getElementById("forgotbtn").innerHTML = " <span class='spinner-border spinner-border-sm mr-2' role='status'style='padding: 7px;' aria-hidden='true'></span>Please Wait..."
        firebase.auth().sendPasswordResetEmail(email).then(function () {
            toastr["success"]("Password Reset Link sended in Email", email);
            setTimeout(() => { window.location.replace("/login") }, 2000)
        })
    } else {
        toastr["error"]("Please enter email");
    }
})
