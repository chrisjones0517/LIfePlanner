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

    var db = firebase.database();
    var dbIndex;
    var snapshot,
        snapshotVal;


    //register new user
    $("#send").on("click", function () {
        var userName = $("#username").val();
        userName = userName.toLowerCase();
        var userPassword = $("#password").val();
        var userProfession = $("#userprofession").val();
        var userFullName = $("#fullname").val();

        //validation
        if (userName != "" && userPassword != "" && userFullName != "" && userProfession != "") {

            if (userPassword.length < 8) {
                console.log(userPassword)
                console.log("password should be 8 characters or more!")
            } else {

                var compareUsername = $.grep(snapshotVal, function (val) {
                    return (val.name === userName)
                });

                if (compareUsername.length) { //if length is 1 => true
                    console.log("Name already used")
                } else {
                    console.log("registered")
                    //users tree in firebase
                    db.ref("users/" + dbIndex).set({
                        id: dbIndex,
                        name: userName,
                        passkey: userPassword,
                        profession: userProfession,
                        fullname: userFullName
                    });
                }
            }
        } else {
            console.log("please fill in all the fields")
        }





    })



    // user login index counter
    db.ref("users").on("value", function (res) {
        snapshot = res;
        snapshotVal = res.val();
        // console.log(res);
        if (res.exists()) { //conditional to increase index number for future signin
            dbIndex = snapshotVal.length;
            console.log(dbIndex);
        } else {
            dbIndex = 0;
            console.log(dbIndex);
        }


    })


    // login 
    $("#compare").on("click", function () {
        var compareUser = $("#username1").val();
        var comparePass = $("#password1").val();


        //login array will hold user data
        var userLogin = $.grep(snapshotVal, function (val) {

            //bring user information based on login info
            //compare against username and password
            return (val.name === compareUser && val.passkey === comparePass)
        });
        console.log(userLogin)
        if (userLogin.length) { //if array length is 1 => true
            console.log("good to go")
        } else {
            console.log("try again")
        }
    })



});