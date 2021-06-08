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
        document.getElementById("signupreg").disabled=true
        document.getElementById("signupreg").innerHTML = " <span class='spinner-border spinner-border-sm mr-2' role='status'style='padding: 7px;' aria-hidden='true'></span>Please Wait..."
        const accCheck = await axios.get("/check", {
            headers: {
                indosnumber: indosnumber
            }
        }).then((res) => {            
            return res.data
        }).catch((error) => {
            console.log(error)
            return false
        })
        if (accCheck != false) return toastr["error"]("Allready Registered..")
        const hashpwd = await axios.post("/hash/generate", {
            password: password
        }).then((res) => {
            return res.data
        }).catch((error) => {
            return false
        })
        if (hashpwd == false) return toastr["error"]("Something Wrong..");
        const signup = await firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
            const userid = user.user.uid
            return { status: true, userid: userid }
        }).catch(function (error) {
            var errorMessage = error.message;
            return { status: false, msg: errorMessage }
        });
        if (signup.status == false) return toastr["error"](signup.msg)
        const regAcc = await axios.post("/signup", {
            firstname: firstname,
            lastname: lastname,
            email: email,
            indosnumber: indosnumber,
            phonenumber: phonenumber,
            dob: dob,
            password: hashpwd,
            clientid: signup.userid
        }).then((res) => {
            return res.data
        }).catch((error) => {
            return false
        })
        if(regAcc.status==false) return toastr["error"]("Something Wrong Try Again")
        localStorage.setItem("userid",regAcc.clientid)
        window.location.replace("/")
    }

})

