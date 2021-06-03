var db = firebase.firestore();

document.getElementById("sendfeedback").addEventListener("click", () => {
    var feedback = document.getElementById("feedback").value
    console.log(feedback);
})

