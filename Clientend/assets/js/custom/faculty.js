var db = firebase.firestore()

db.collection("faculty").get().then((snap) => {
    snap.forEach((doc) => {
        console.log(doc.data());
        document.getElementById("card-carouselteam").innerHTML += `
      <div class="col-12 col-md-6 col-lg-3">
      <div class="team-card">
        <div class="cnt-block equal-hight"">
          <figure><img src="${doc.data().fimage}" class="img-responsive" alt="${doc.data().fname}"></figure>
          <h3>${doc.data().fname}</h3>
          <span class="font-weight-bold">${doc.data().fposition}</span>
          <p class="m-0">${doc.data().fdescription}</p>
        </div>
        <div class="card-wave">
          <div class="wave wave1"></div>
          <div class="wave wave2"></div>
          <div class="wave wave3"></div>
          <div class="wave wave4"></div>
        </div>
      </div>
    </div>`
    })
})