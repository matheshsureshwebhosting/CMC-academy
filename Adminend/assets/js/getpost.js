var db = firebase.firestore();
db.collection("blog").get().then((snap) => {
    snap.forEach((doc) => {
        console.log(doc.data())
        document.getElementById("getpostdata").innerHTML +=
            `
                   <div class="col-md-6">
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
                            <div class="blogshort">${doc.data().txt}</div>
                            <a class="btn btn-info" id="${doc.id}" style='color:white' onclick='readmore(this.id)'>Read More</a>
                        </div>
                    </div>
                </div>
       
       `
    })
})


readmore = (e) => {    
    localStorage.setItem("blogid", e)   
    window.location.replace("blog-details.html")
}