const loginbtn = document.getElementById("loginbtn")
var db = firebase.firestore()
loginbtn.addEventListener("click", async () => {
    const indosno = document.getElementById("indosno").value
    const password = document.getElementById("password").value

    if (indosno.trim().length == 0) {
    } else if (password.trim().length == 0) {

    } else {
        document.getElementById("loginbtn").innerHTML = " <span class='spinner-border spinner-border-sm mr-2' role='status'style='padding: 7px;' aria-hidden='true'></span>Please Wait..."
        const accCheck = await axios.get("/check", {
            headers: {
                indosnumber: indosno
            }
        }).then((res) => {
            return res.data
        }).catch((error) => {
            console.log(error)
            return false
        })
        if (accCheck == false) return toastr["error"]("Not Registered..")
        if (accCheck.length != 1) return toastr["error"]("Something Wrong..")
        const pwdverify = await axios.post("/hash/verify", {
            password: password,
            hashPwd: accCheck[0].password
        }).then((res) => { return res.data }).catch((error) => { return false })
        if (pwdverify != false) {            
            const loginuser = await new Promise(async (resolve, reject) => {
                await firebase.auth().signInWithEmailAndPassword(accCheck[0].email, password).then(async function () {
                    await firebase.auth().onAuthStateChanged(function (user) {
                        if (user) {
                            return resolve({ status: true, clientid: user.uid })
                        } else {
                            return resolve({ status: false, msg: "Try Again" })
                        }
                    });
                }).catch(function (error) {
                    var errorMessage = error.message;
                    return resolve({ status: false, msg: errorMessage })
                });
            })
            if (loginuser.status == false) return toastr["error"](loginuser.msg)
            toastr["success"]("Welcome To CMC Maritime-Academy..");
            sessionStorage.setItem("userid", loginuser.clientid)
            setTimeout(() => {
                window.location.replace("/")
            }, 1000)
        } else {            
            const loginuser = await new Promise(async (resolve, reject) => {
                await firebase.auth().signInWithEmailAndPassword(accCheck[0].email, password).then(async function () {
                    await firebase.auth().onAuthStateChanged(function (user) {
                        if (user) {
                            return resolve({ status: true, clientid: user.uid })
                        } else {
                            return resolve({ status: false, msg: "Try Again" })
                        }
                    });
                }).catch(function (error) {
                    var errorMessage = error.message;
                    return resolve({ status: false, msg: errorMessage })
                });
            })
            if (loginuser.status == false) return toastr["error"](loginuser.msg)
            const hashpwd = await axios.post("/hash/generate", {
                password: password
            }).then((res) => {
                return res.data
            }).catch((error) => {
                return false
            })
            const newHashpwd = {
                password: hashpwd
            }            
            const updatePwd = await axios.post("/updatepassword", newHashpwd, {
                headers: {
                    clientid: loginuser.clientid
                }
            }).then((res) => { return res.data }).catch((error) => { return false })
            if(updatePwd==true){
                toastr["success"]("Welcome To CMC Maritime-Academy..");
                sessionStorage.setItem("userid", loginuser.clientid)
                setTimeout(() => {
                    window.location.replace("/")
                }, 1000)
            }else{
                 toastr["error"]("Something Wrong Try Again")
                window.location.reload()
            }
        }

    }
})