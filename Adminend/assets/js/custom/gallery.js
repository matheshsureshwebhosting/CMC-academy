var db = firebase.firestore();
// 

document.getElementById("submitgallery").addEventListener("click", async () => {
    var gallery = document.querySelector("#gallery").files
    document.getElementById("submitgallery").innerHTML = " <span class='spinner-border spinner-border-sm mr-2' role='status'style='padding: 7px;' aria-hidden='true'></span>Please Wait..."
    let file11 = new Promise((resolve, reject) => {
        var storageRef = firebase.storage().ref("gallery/" + gallery[0].name);
        storageRef.put(gallery[0]).then(function (snapshot) {
            storageRef.getDownloadURL().then(function (url) {  //img download link ah ketakiradhu
                setTimeout(() => resolve(url), 1000)
            })
        });

    });
    var imgurl = await file11
    console.log(imgurl)

    var imagegallery = {
        gallery: imgurl,

    }

    db.collection("gallery").doc().set(imagegallery).then(() => {
        toastr["success"]("New Image Added Successfully..");
        setTimeout(() => { window.location.reload() }, 2000)
    }).catch((error) => {
        console.log(error.message)
    })
})

db.collection("gallery").get().then((snap) => {


    snap.forEach((doc) => {
        if (doc.data() != undefined) {

            console.log(doc.data())
            // document.getElementById("facultyno").style.display = "none"
            document.getElementById("aniimated-thumbnials").innerHTML += ` 
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 m-b-30"> <a
                href="#"  id="${doc.id}" onclick='del(this.id)' > <img
                    class="img-fluid img-thumbnail"
                    src="${doc.data().gallery}" alt=""> <i class="delecticon fa fa-trash-o aria-hidden='true" ></i>  </a></div>`


        } else {
            // document.getElementById("facultynoti").style.display = "block"
        }

    })
})

del = (e) => {
    db.collection("gallery").doc(e).delete().then(() => {
        // toastr["error"]("Course Deleted");
        setTimeout(() => { window.location.reload() }, 1000)
    })

}