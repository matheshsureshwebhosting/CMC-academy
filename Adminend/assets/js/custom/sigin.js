var provider = new firebase.auth.GoogleAuthProvider();

document.getElementById("sigin").addEventListener("click", function (e) {
    e.preventDefault()
    alert("okk")
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        if (user.email == "kalaivani7m@gmail.com" || user.email == "marketingclientsofms@gmail.com") {
            localStorage.setItem("userid", user.uid)
            toastr["success"]("Welcome To CTP Admin Panel");
            setTimeout(() => {
                window.location.replace("/home")
            }, 3000)
        } else {
            toastr["error"]("Choose Correct Account");
            setTimeout(() => {
                window.location.replace("sign-in.html")
            }, 3000)

        }
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        toastr["error"](email);
    });

})

var userid = localStorage.getItem("userid")
if (userid != undefined) {
    window.location.replace("/home")
} else {
    toastr["error"]("Please Login..");
}