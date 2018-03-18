$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDROSTywWg_ixRczEBDOcFtjiEOoSS4CaQ",
        authDomain: "stayfit-198201.firebaseapp.com",
        databaseURL: "https://stayfit-198201.firebaseio.com",
        projectId: "stayfit-198201",
        storageBucket: "stayfit-198201.appspot.com",
        messagingSenderId: "38227001509"
    };
    firebase.initializeApp(config);


    $("#send").on("click", function () {
        var userName = $("#username").val();
            userName = userName.toLowerCase();
        var userPassword = $("#password").val();


        var compareUsername = $.grep(snapshot, function (val) {
            return (val.name === userName)
        });

        if (compareUsername.length) { //if length is 1 => true
            console.log("Name already used")
        } else {
            console.log("registered")
            //users tree in firebase
            db.ref("users/" + dbIndex).set({
                id : dbIndex,
                name: userName,
                passkey: userPassword
            });
        }



    })



    // that will pull all users in database for login and signin
    db.ref("users").on("value", function (res) {
        snapshot = res.val()
        // console.log(snapshot);
        // console.log(res);
        if (res.exists()) { //conditional to increase index number for future signin
            dbIndex = snapshot.length;
            console.log(dbIndex);
        } else {
            dbIndex = 0;
            console.log(dbIndex);
        }


    })



    $("#compare").on("click", function () {
        var compareUser = $("#username1").val();
        var comparePass = $("#password1").val();


        //login array will hold user data
        var userLogin = $.grep(snapshot, function (val) {

            //bring user information based on login info
            //compare against username and password
            return (val.name === compareUser && val.passkey === comparePass)
        });
        console.log(userLogin)
        if (userLogin.length) { //if length is 1 => true
            console.log("good to go")
        } else {
            console.log("try again")
        }
    })
    


});