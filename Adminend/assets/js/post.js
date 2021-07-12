const postbtn = document.getElementById("bostbtn")
var db = firebase.firestore()

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}
postbtn.addEventListener("click", async () => {
    var title = document.getElementById("blogtitle").value;
    var cat = document.getElementById("blogcat").value;
    var txt = document.getElementById("blogtxts").innerHTML;
    var blogfile = document.querySelector("#blogfile").files[0]

    let blogfiles = new Promise((resolve, reject) => {
        var storageRef = firebase.storage().ref("blogs/" + blogfile.name);
        var test = [];
        storageRef.put(blogfile).then(function (snapshot) {
            console.log('Uploaded a blob or file!');

            storageRef.getDownloadURL().then(function (url) {  //img download link ah ketakiradhu

                setTimeout(() => resolve(url), 1000)
            })
        });

    });
    var blogfileurl = await blogfiles
    console.log(title, cat, txt, blogfileurl)
    db.collection("blog").doc().set({
        title: title,
        cat: cat,
        txt: txt,
        mainimg:blogfileurl
    }).then(() => { alert("okay") })
})

