
const signupreg = document.getElementById("signupreg")

signupreg.addEventListener("click", () => {
    var firstname = document.getElementById("firstname").value
    var lastname = document.getElementById("lastname").value
    var email = document.getElementById("email").value
    var indosnumber = document.getElementById("indosnumber").value
    var phonenumber = document.getElementById("phonenumber").value
    var dob = document.getElementById("dob").value
    var password = document.getElementById("password").value
    var cpassword = document.getElementById("cpassword").value
    if (firstname.trim().length == 0) {        
        document.getElementById("errordiv").innerHTML=""
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
        document.getElementById("errordiv").innerHTML=""     
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
        document.getElementById("errordiv").innerHTML=""
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
        document.getElementById("errordiv").innerHTML=""
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
        document.getElementById("errordiv").innerHTML=""
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
        document.getElementById("errordiv").innerHTML=""
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
        document.getElementById("errordiv").innerHTML=""
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
        document.getElementById("errordiv").innerHTML=""
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
        console.log(firstname, lastname, email, indosnumber, phonenumber, dob, password, cpassword)

        axios.post("/signup", {
            firstname: firstname,
            lastname: lastname,
            email: email,
            indosnumber: indosnumber,
            phonenumber: phonenumber,
            dob: dob,
            password: password,            
        }).then((res) => {
          document.getElementById("errordiv").innerHTML=""
          document.getElementById("errordiv").innerHTML +=
          `
      <div class="alert alert-success alert-dismissible fade show" role="alert">
     Account Registerd
                              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
      `
        }).catch((error) => {
          if(error){
            document.getElementById("errordiv").innerHTML=""
            document.getElementById("errordiv").innerHTML +=
            `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
       ${error.response.data}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
        `
          }
        })
    }

})

