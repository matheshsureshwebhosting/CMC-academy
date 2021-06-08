var db = firebase.firestore();
var type = sessionStorage.getItem("type")
var userid = localStorage.getItem("userid")

db.collection("newcourse")
  .orderBy("date", "asc").limit(3).get().then((snap) => {
    snap.forEach((doc) => {
      if (doc.data().courseid == undefined) {
        document.getElementById('courses').innerHTML +=
          `<div class="col-lg-4 col-md-6 portfolio-item ${doc.data().type}">
    <div class="portfolio-wrap" id="${doc.id}" onclick='view(this.id)'>
      <img src=${doc.data().thum} class="img-fluid" alt="">
      <div class="overlay">${doc.data().category}</div>
      <div class="portfolio-info">
        <h4>Rs. ${doc.data().ofees} <span style="text-decoration: line-through; font-weight: 400; color: rgba(255, 255, 255, 0.671)">Rs. ${doc.data().rfees}</span></h4>
      </div>
    </div>
  </div>`
      }

    })
  })


view = (e) => {
  if(userid==null) return  toastr["info"]("Please Login And Continue...");
  localStorage.setItem("courseid", e)
  window.location.replace("/dashboard/")
}
const findcourse = document.getElementById("findcourse")
findcourse.addEventListener("keyup", async () => {
  var searchcourse = findcourse.value
  var searchcourses = document.getElementById("searchcourses")
  if (searchcourse.length == 0) return searchcourses.style.display = "none"
  searchcourses.style.display = "block"
  const allcourse = await allCourse()
  const filtercourse = await filterCourse(searchcourse, allcourse)
  const removeduplicates = await removeduplicate(filtercourse)
  document.getElementById("searchcourses").innerHTML = ""
  if (removeduplicates.length == 0) {
    document.getElementById("searchcourses").innerHTML =
      `
  <div class="searchitem" style="cursor: pointer;padding:10px;" >No Result Founded</div>
  `
  }
  removeduplicates.forEach((data) => {
    document.getElementById("searchcourses").innerHTML +=
      `
    <div class="searchitem" id="${data.id}" onclick="searchedcourse(this)" style="cursor: pointer;padding:10px;" >${data.course}</div>
    `
  })
})

removeduplicate = async (filtercourse) => {
  const removeduplicate = new Promise(async (resolve, reject) => {
    const filteredArr = filtercourse.reduce((acc, current) => {
      const x = acc.find(item => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    return resolve(filteredArr)
  })
  return await removeduplicate
}

allCourse = async () => {
  const allCourse = new Promise(async (resolve, reject) => {
    await db.collection("newcourse").get().then((snap) => {
      const data = []
      snap.forEach((doc) => {
        if (doc.data() != undefined) {
          data.push({ course: doc.data().title, id: doc.id })
        }
      })
      return resolve(data)
    })
  })
  return await allCourse
}

filterCourse = async (searchcourse, allcourse) => {
  const filterCourse = new Promise(async (resolve, reject) => {
    const data = []
    for (var i = 0; i < allcourse.length; i++) {
      var coures = await allcourse[i].course.toLowerCase()
      if (coures.includes(searchcourse.toLowerCase())) {
        data.push(allcourse[i])
      }
    }
    return resolve(data)
  })
  return await filterCourse
}

searchedcourse = (e) => {
  console.log(e.id);
  if(userid==null) return  toastr["info"]("Please Login And Continue...");
  localStorage.setItem("courseid", e.id)
  window.location.replace("/dashboard")
}


function coursefilter(e) {
  var type = e.id
  document.getElementById('courses').innerHTML = ""
  db.collection("newcourse").where("type", "==", type).limit(3).get().then((snap) => {
    var data = []
    snap.forEach((doc) => {
      data.push(doc.data())
      if (doc.data() != undefined) {
        document.getElementById('courses').innerHTML +=
          `<div class="col-lg-4 col-md-6 portfolio-item ${doc.data().type}">
        <div class="portfolio-wrap" id="${doc.id}" onclick='view(this.id)'>
          <img src=${doc.data().thum} class="img-fluid" alt="">
          <div class="overlay">${doc.data().category}</div>
          <div class="portfolio-info">
            <h4>Rs. ${doc.data().ofees} <span style="text-decoration: line-through; font-weight: 400; color: rgba(255, 255, 255, 0.671)">Rs. ${doc.data().rfees}</span></h4>
          </div>
        </div>
      </div>`
      }

    })
    if (data.length == 0) {
      document.getElementById('courses').innerHTML = ""

    }

  })
}