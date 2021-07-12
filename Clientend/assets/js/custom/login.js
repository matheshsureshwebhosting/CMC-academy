const loginbtn = document.getElementById("loginbtn")

loginbtn.addEventListener("click", async () => {
    const indosno = document.getElementById("indosno").value
    const password = document.getElementById("password").value

    if (indosno.trim().length == 0) {
    } else if (password.trim().length == 0) {

    } else {
        document.getElementById("loginbtn").innerHTML = " <span class='spinner-border spinner-border-sm mr-2' role='status'style='padding: 7px;' aria-hidden='true'></span>Please Wait..."
        const user = await axios.get("/user/single/indosnumber", {
            headers: {
                indosnumber: indosno
            }
        }).then((res) => { return res.data }).catch((error) => { return false })
        if (user == false) return toastr["error"]("Invalid Indos Number..");
        
        const getUserpwdhash = await axios.get("/user/single/email", {
            headers: {
                email: user
            }
        }).then((res) => { return res.data }).catch((error) => { return false })
        const pwdverify = await axios.post("/hash/verify", {
            password: password,
            hashPwd: getUserpwdhash.password
        }).then((res) => { return res.data }).catch((error) => { return false })
        if (pwdverify == false) return toastr["error"]("Password Invalid..");
        
        const loginuser = await new Promise(async (resolve, reject) => {
            await firebase.auth().signInWithEmailAndPassword(user, pwdverify).then(async function () {
                await firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        return resolve({ status: true, msg: user.uid })
                    } else {
                        return resolve({ status: false, msg: "Try Again" })
                    }
                });
            }).catch(function (error) {
                var errorMessage = error.message;
                return resolve({ status: false, msg: errorMessage })
            });
        })
        if (loginuser.status == false) return toastr["error"](loginuser.msg);
        
        const getToken = await axios.get("/user/single/clientidauth", {
            headers: {
                clientid: loginuser.msg
            }
        }).then((res) => { sessionStorage.setItem("userid", loginuser.msg); return res.data }).catch((error) => { return false })
        if (getToken == false) return toastr["error"]("Try Again..");
       
        toastr["success"]("Welcome To CMC Maritime-Academy..");
        setTimeout(() => {
            window.location.replace("/")
        }, 1000)
    }
})