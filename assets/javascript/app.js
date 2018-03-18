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



    $('#submit').on('click', function (e) {
        e.preventDefault();
        $("#data").empty();
        var query = $('#search').val();



        var url = "https://api.datausa.io/api/?show=geo&sumlevel=state&required=avg_wage";

        d3.json(url, function (json) {

            var data = json.data.map(function (data) {
                return json.headers.reduce(function (obj, header, i) {
                    obj[header] = data[i];
                    return obj;
                    console.log(obj);
                }, {});
            });

        });

    });


});