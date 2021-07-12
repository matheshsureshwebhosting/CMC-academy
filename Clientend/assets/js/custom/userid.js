var userid=sessionStorage.getItem("userid")


if(userid==null){
    document.getElementById("profilehead").style.display="none"
    document.getElementById("profilenav").style.display="none"
    document.getElementById("cartnav").style.display="none"
    document.getElementById("viewcartbtn").style.display="none"
    
}
