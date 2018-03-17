$(document).ready(function () {

    var city_stateId;

    $('#submit').on('click', function (e) {
        e.preventDefault();
        $("#data").empty();
        var query = $('#search').val();
        var city_state = 'Houston tx';
        var profession = 'accountant';

        var queryUrl = `https://api.datausa.io/attrs/search/?q=${city_state}&kind=geo`;
        var queryUrl2 = `https://api.datausa.io/attrs/search/?q=${profession}&kind=soc`;

        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).then(function(response) {
            console.log(response.data[0]);
            var conf = confirm("Is your city " + response.data[0][1]);
            if (conf === true) {
                city_stateId = response.data[0][0];
            }
            

        }).then(function(response) {
            $.ajax({
                url: queryUrl2,
                method: 'GET'
            
            }).then(function(response) {
                console.log(response);
            });
        
        });
    });







        // var url = "https://api.datausa.io/api/?show=geo&sumlevel=all&required=grads_men,grads_women";
        // d3.json(url, function (json) {
        //     var data = json.data.map(function (data) {
        //         return json.headers.reduce(function (obj, header, i) {
        //             obj[header] = data[i];
        //             console.log("here", obj)
        //             return obj;
        //             //console.log("imhere", obj[header]);
        //         }, {});
        //     });
        // });


    

});