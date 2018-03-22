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
        var userFullName = $("#fullname").val();
        var clickedButton = "#send"

        //validation
        //all feilds should have some values
        if (userName != "" && userPassword != "" && userFullName != "") {

            if (userPassword.length < 8) {
                console.log(userPassword)
                var message = "password should be 8 characters or more!";
                getSalty(clickedButton, message);
            } else {

                var compareUsername = $.grep(snapshotVal, function (val) {
                    return (val.name === userName)
                });

                if (compareUsername.length) { //if length is 1 => true
                    var message = "Name already used";
                    getSalty(clickedButton, message);

                } else {
                    console.log("registered")
                    //users tree in firebase
                    db.ref("users/" + dbIndex).set({
                        id: dbIndex,
                        name: userName,
                        passkey: userPassword,
                        fullname: userFullName
                    });
                }
            }
        } else {
            var message = "Please fill in all the fields";
            getSalty(clickedButton, message);
        }


    })

    function getSalty(selector, text) {
        $(selector).addClass("shake");
        $(".userReg").css("height", "310px")
        setTimeout(() => {
            $("#regMessage").text(text)   
        }, 500);
        
        setTimeout(function () {
            $(selector).removeClass("shake");
            $(".userReg").css("height", "280px")
            $("#regMessage").text("")
        }, 2000)
    }



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
        var clickedButton = "#compare"


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
            var message = "Either username or password is incorrect";
            getSalty(clickedButton, message)
        }
    })

    $("#guest").on("click", function () {
        $(".userReg").toggleClass("flipInY hinge")
        setTimeout(function () {
            $(".screen").hide(1000);
        }, 2500)
    })


});