var db = firebase.firestore();

db.collection("newcourse").get().then((snap) => {
  snap.forEach((doc) => {
    console.log(doc.data());
    document.getElementById('courses').innerHTML +=
      `<div class="col-lg-4 col-md-6 portfolio-item ${doc.data().type}">
    <div class="portfolio-wrap" id="${doc.id}" onclick='view(this.id)'>
      <img src=${doc.data().thum} class="img-fluid" alt="">
      <div class="overlay">${doc.data().category}</div>
      <div class="portfolio-info">
        <h4>Rs. ${doc.data().ofees} <span style="text-decoration: line-through; font-weight: 400; color: rgba(255, 255, 255, 0.671)">Rs. ${doc.data().rfees}</span></h4>
        <div class="rating">
          <img src="/img/icon/star-solid.svg" alt="" height="10px">
          <img src="/img/icon/star-solid.svg" alt="" height="10px">
          <img src="/img/icon/star-solid.svg" alt="" height="10px">
          <img src="/img/icon/star-solid.svg" alt="" height="10px">
          <img src="/img/icon/star-solid.svg" alt="" height="10px">
          <span class="badge badge-light">5</span>
        </div>
      </div>
    </div>
  </div>`
  })
})



view = (e) => {
  localStorage.setItem("courseid", e)
  window.location.replace("/dashboard/")
}