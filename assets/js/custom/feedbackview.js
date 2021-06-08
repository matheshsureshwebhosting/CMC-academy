var db = firebase.firestore();

db.collection("feedback").get().then((snap) => {
  snap.forEach((doc) => {
    document.getElementById("feedbackview").innerHTML += `
        <div class="col-lg-6">
            <div class="testimonial-item">
              <img src="/img/testimonials/testimonials-1.jpg" class="testimonial-img" alt="">
              <h3>${doc.data().name}</h3>
              <h4>Student</h4>
              <p>
                <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                ${doc.data().feedback}
                <i class="bx bxs-quote-alt-right quote-icon-right"></i>
              </p>
            </div>
          </div>`
  })
})


db.collection("feedback").limit(4).get().then((snaps) => {
  snaps.forEach((docs) => {
    document.getElementById("testimonialview").innerHTML += `
    
          <div class="item">
            <div class="testimonial-item">
              <img src="/img/testimonials/testimonials-1.jpg" class="testimonial-img" alt="">
              <h3>${docs.data().name}</h3>
              <h4>Ceo &amp; Founder</h4>
              <p>
                <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                ${docs.data().feedback}
                <i class="bx bxs-quote-alt-right quote-icon-right"></i>
              </p>
            </div>
          </div>`
  })
})