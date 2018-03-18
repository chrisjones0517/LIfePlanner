$(document).ready(function () {



    $('#submit').on('click', function (e) {
        e.preventDefault();
        $("#data").empty();
        var queryUrl = 'https://api.careeronestop.org/v1/occupation/NzX2rM28B8dZLR3/mechanic/y/0/10';
        // 'https://api.careeronestop.org/v1/occupation/NzX2rM28B8dZLR3/Registered%20Nurses/TX?training=true&interest=true&videos=true&tasks=true&dwas=true&wages=true&alternateOnetTitles=true&projectedEmployment=true&ooh=true&stateLMILinks=true&relatedOnetTitles=true&skills=true&knowledge=true&ability=true&trainingPrograms=true'
        $.ajax({
            url: queryUrl,
            dataType: 'json',
            type: 'GET',
            beforeSend: function (xhr) {

                xhr.setRequestHeader('Authorization', 'Bearer ' + 'KZasPLkGaB4qx+wuKxVDBoBHMO3iu+sTcYuhf9Et/1ueVH3efsEr3OEpWUXl24ukjrYWm8GTLn94+RbOE/FKKg==')

            },
            success: function (response) {
                console.log(response);
            }
        });



    });



    $('#weather').on('click', function (e) {
        e.preventDefault();
        console.log("wasclicked")
        WaetherCall()
    })
    var units = 'imperial';
    function WaetherCall() {
        var inputWeather = "Houston"   //$("#search-input").val().trim() ;
        //api.openweathermap.org/data/2.5/forecast?lat=35&lon=139; getting info from Mohammed lt return 
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + inputWeather + ",us&APPID=eeda0b646e014b160ccbce009bb655ef";
        $.ajax({
            url: queryURL,
            method: "GET",
            data: {
                cnt: 16,
                units: units
            }

        }).then(function (data) {
            console.log(data)
            lat = data.city.coord.lat;
            lon = data.city.coord.lon;
            city = data.city.name;
            cityPop = data.city.population;
            highF = Math.round(data.list[0].main.temp_max) + '°';
            lowF = Math.round(data.list[0].main.temp_min) + '°';
            description = data.list[0].weather[0].description;
            console.log(lat, lon)
            console.log(city, cityPop)
            console.log(lowF, highF,description)
        });


    }

});