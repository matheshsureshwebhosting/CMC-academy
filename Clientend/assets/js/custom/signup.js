const signupreg = document.getElementById("signupreg")

signupreg.addEventListener("click", async () => {
  var firstname = document.getElementById("firstname").value
  var lastname = document.getElementById("lastname").value
  var email = document.getElementById("email").value
  var indosnumber = document.getElementById("indosnumber").value
  var phonenumber = document.getElementById("phonenumber").value
  var dob = document.getElementById("dob").value
  var password = document.getElementById("password").value
  var cpassword = document.getElementById("cpassword").value
  if (firstname.trim().length == 0) {
    document.getElementById("errordiv").innerHTML = ""
    document.getElementById("errordiv").innerHTML +=
      `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                First Name Required
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
        `
  } else if (lastname.trim().length == 0) {
    document.getElementById("errordiv").innerHTML = ""
    document.getElementById("errordiv").innerHTML +=
      `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Last Name Required
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
        `

  } else if (!(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/).test(email)) {
    document.getElementById("errordiv").innerHTML = ""
    document.getElementById("errordiv").innerHTML +=
      `
<div class="alert alert-danger alert-dismissible fade show" role="alert">
Email Required
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
`

  } else if (indosnumber.trim().length != 8) {
    document.getElementById("errordiv").innerHTML = ""
    document.getElementById("errordiv").innerHTML +=
      `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
    Indos Number Required
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
    `

  } else if (phonenumber.trim().length == 0) {
    document.getElementById("errordiv").innerHTML = ""
    document.getElementById("errordiv").innerHTML +=
      `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
    Phone Number Required
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
    `

  } else if (dob.trim().length == 0) {
    document.getElementById("errordiv").innerHTML = ""
    document.getElementById("errordiv").innerHTML +=
      `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
    Date Of Birth Required
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
    `

  } else if (password.trim().length == 0) {
    document.getElementById("errordiv").innerHTML = ""
    document.getElementById("errordiv").innerHTML +=
      `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
    Password Required
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
    `

  } else if (cpassword != password) {
    document.getElementById("errordiv").innerHTML = ""
    document.getElementById("errordiv").innerHTML +=
      `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
   Confirm Password Not Match
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
    `

  } else {
    document.getElementById("signupreg").innerHTML = " <span class='spinner-border spinner-border-sm mr-2' role='status'style='padding: 7px;' aria-hidden='true'></span>Please Wait..."
    
    const hashpwd = await axios.post("/hash/generate", {
      password: password
    }).then((res) => {
      return res.data
    }).catch((error) => {
      return false
    })
    
    if (hashpwd == false) return toastr["error"]("something Wrong");
    const siginup = await firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
      var userid = user.user.uid
      sessionStorage.setItem("userid",userid)
      return { status: true, userid: userid }
    }).catch(function (error) {
      var errorMessage = error.message;
      return { status: false, msg: errorMessage }
    });
    if (siginup.status == false) return toastr["error"](siginup.msg);
    const sendsiginform = await axios.post("/signup", {
      firstname: firstname,
      lastname: lastname,
      email: email,
      indosnumber: indosnumber,
      phonenumber: phonenumber,
      dob: dob,
      password: hashpwd,
      clientid: siginup.userid
    }).then((res) => {          
      if (res.data.status == true) {        
        return { status: true, msg: res.data.clientid }

      } else {
        return { status: false, msg: "Try Again" }
      }
    }).catch((error) => {
      if (error) return { status: false, msg: error }
    })        
    if (sendsiginform.status == true) {
      sessionStorage.setItem("userid",sendsiginform.msg)
      toastr["success"]("Successfully Registered..");
      window.location.replace("/")
    } else {
      toastr["error"]("Try Again..");

    }

  }

})

