var db = firebase.firestore();
var userid = sessionStorage.getItem("userid")

db.collection("users").doc(userid).get().then((doc) => {
    document.getElementById("fullname").innerHTML = `${doc.data().firstname +" " + doc.data().lastname}`
    document.getElementById("firstname").value = `${doc.data().firstname}`
    document.getElementById("lastname").value = `${doc.data().lastname}`
    document.getElementById("indosnumber").value = `${doc.data().indosnumber}`
    document.getElementById("phone").value = `${doc.data().phonenumber}`
    document.getElementById("email").value = `${doc.data().email}`
    document.getElementById("dob").value = `${doc.data().dob}`
    if(doc.data().profilepic==undefined){
        document.getElementById("profilepic").style.display="none"
    }else{
        document.getElementById("profilepic").src =`${doc.data().profilepic}`
    }
 
})


document.getElementById("updateprofile").addEventListener("click", async () => {
    var firstname = document.getElementById("firstname").value
    var lastname = document.getElementById("lastname").value
    var indosnumber = document.getElementById("indosnumber").value
    var phone = document.getElementById("phone").value
    var email = document.getElementById("email").value
    var dob = document.getElementById("dob").value
    var profile = document.querySelector("#fileid").files
    document.getElementById("updateprofile").innerHTML = " <span class='spinner-border spinner-border-sm mr-2' role='status'style='padding: 7px;' aria-hidden='true'></span>Please Wait..."
    let file11 = new Promise((resolve, reject) => {
        var storageRef = firebase.storage().ref("profile/" + profile[0].name);
        var test = [];
        storageRef.put(profile[0]).then(function (snapshot) {
            storageRef.getDownloadURL().then(function (url) {  //img download link ah ketakiradhu
                setTimeout(() => resolve(url), 1000)
            })
        });

    });
    var imgurl = await file11

    db.collection("users").doc(userid).update({
        firstname: firstname,
        lastname: lastname,
        email: email,
        indosnumber: indosnumber,
        phonenumber: phone,
        dob: dob,
        profilepic: imgurl
    }).then(() => {
        toastr["success"]("profile Updated Successfully...");
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    })

})