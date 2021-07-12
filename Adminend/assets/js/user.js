// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDmHb_GCHOwYP8upEpEURIryrchjZJ5VcE",
    authDomain: "swathika-5f612.firebaseapp.com",
    databaseURL: "https://swathika-5f612.firebaseio.com",
    projectId: "swathika-5f612",
    storageBucket: "swathika-5f612.appspot.com",
    messagingSenderId: "5893097934",
    appId: "1:5893097934:web:ccdddac134c82f047a439f"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();
var db=firebase.firestore()


firestore.collection("client").doc("info@CMC.com").collection("contact_form").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
    console.log(doc.data())
    document.getElementById('userTableBody').innerHTML +=
        `<td>${doc.data().cname}</td>
            <td>${doc.data().cemail}</td>
            <td>${doc.data().cnumber}</td>
            <td>${doc.data().csubject}</td>
            <td>${doc.data().clooking}</td>
            <td>${doc.data().cmessage}</td>
            <td>${doc.data().chear}</td>`
})
})
