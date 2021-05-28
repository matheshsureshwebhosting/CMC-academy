const loginbtn = document.getElementById("loginbtn")

loginbtn.addEventListener("click", () => {
    const indosno = document.getElementById("indosno").value
    const password = document.getElementById("password").value

    if (indosno.trim().length == 0) {
    //     document.getElementById("errordiv").innerHTML = ""
    //     document.getElementById("errordiv").innerHTML +=
    //         `
    // <div class="alert alert-danger alert-dismissible fade show" role="alert">
    //                         First Name Required
    //                         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    //                           <span aria-hidden="true">&times;</span>
    //                         </button>
    //                       </div>
    // `
    } else if (password.trim().length == 0) {
    //     document.getElementById("errordiv").innerHTML = ""
    //     document.getElementById("errordiv").innerHTML +=
    //         `
    // <div class="alert alert-danger alert-dismissible fade show" role="alert">
    // Last Name Required
    //                         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    //                           <span aria-hidden="true">&times;</span>
    //                         </button>
    //                       </div>
    // `

    }else{
        axios.post("/login",{
            indosnumber:indosno,
            password:password
        }).then((res) => {
    //         document.getElementById("errordiv").innerHTML=""
    //         document.getElementById("errordiv").innerHTML +=
    //         `
    //     <div class="alert alert-success alert-dismissible fade show" role="alert">
    //    Account Registerd
    //                             <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    //                               <span aria-hidden="true">&times;</span>
    //                             </button>
    //                           </div>
    //     `
          }).catch((error) => {
        //     if(error){
        //       document.getElementById("errordiv").innerHTML=""
        //       document.getElementById("errordiv").innerHTML +=
        //       `
        //   <div class="alert alert-danger alert-dismissible fade show" role="alert">
        //  ${error.response.data}
        //                           <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        //                             <span aria-hidden="true">&times;</span>
        //                           </button>
        //                         </div>
        //   `
        //     }
          })
    }
})