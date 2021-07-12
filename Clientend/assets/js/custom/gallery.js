var db = firebase.firestore();
db.collection("gallery").get().then((snap) => {
  snap.forEach((doc) => {
    console.log(doc.data());
    document.getElementById("galleryimg").innerHTML +=
      `
    <div class="col-lg-3 col-md-4 col-xs-6 thumb">
                              <a class="thumbnail" href="#" data-image-id="" data-toggle="modal" data-title="Swimming Pool"
                                 data-image="/img/infrastructure/swimming-pool.jpg"
                                 data-target="#image-gallery">
                                  <img class="img-thumbnail"
                                       src="${doc.data().gallery}"
                                       alt="Another alt text">
                              </a>
                          </div>
    `

  })
})

