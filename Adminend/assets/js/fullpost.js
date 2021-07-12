var blogid=localStorage.getItem("blogid")
console.log(blogid)

var db=firebase.firestore();
db.collection("blog").doc(blogid).get().then((doc)=>{
    console.log(doc.data())
  document.getElementById("fullpost").innerHTML+=
  `
  <div class="blogitem mb-5">
  <div class="blogitem-image">
      <a href="blog-details.html"><img src="${doc.data().mainimg}" alt="blog image"></a>
      
  </div>
  <div class="blogitem-content">
      <div class="blogitem-header">         
          <div class="blogitem-share">
              <ul class="list-unstyled mb-0">
                  <li><a href="javascript:void(0);"><i class="zmdi zmdi-facebook-box"></i></a></li>
                  <li><a href="javascript:void(0);"><i class="zmdi zmdi-instagram"></i></a></li>
                  <li><a href="javascript:void(0);"><i class="zmdi zmdi-twitter-box"></i></a></li>
                  <li><a href="javascript:void(0);"><i class="zmdi zmdi-linkedin-box"></i></a></li>
              </ul>
          </div>
      </div>
      <h5><a href="blog-details.html">${doc.data().title}</a></h5>
      <div>${doc.data().txt}</div>
  </div>
</div>
  `
})