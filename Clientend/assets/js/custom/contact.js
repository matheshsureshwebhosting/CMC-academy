var db = firebase.firestore()

var submitbtn = document.getElementById("submitbtn")
submitbtn.addEventListener("click", () => {
    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var message = document.getElementById("message").value
    var emilreg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (name.trim().length == 0) {
        document.getElementById("fname").style.display = "block"
        return false
    } else if (!emilreg.test(email)) {
        document.getElementById("femail").style.display = "block"
        return false
    } else if (message.trim().length == 0) {
        document.getElementById("fmessage").style.display = "block"
        return false
    } else {
        document.getElementById("fname").style.display = "none"
        document.getElementById("femail").style.display = "none"
        document.getElementById("fmessage").style.display = "none"
        submitbtn.innerHTML = `<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
Submitting...`
        submitbtn.disabled = true
        db.collection("enquire").doc().set({
            name: name,
            email: email,
            message: message,
            date: new Date().toLocaleString()

        }).then(() => {
            document.getElementById("success").style.display = "block"
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        })

    }
})