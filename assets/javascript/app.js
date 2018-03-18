$(document).ready(function () {



    $('#submit').on('click', function (e) {
        e.preventDefault();
        $("#data").empty();
        var occupation = $('#search').val();
        var cityStateZip = $('#cityStateZip').val();
        // $('#city').val();
        var occCode;

        var queryUrl = `https://api.careeronestop.org/v1/occupation/NzX2rM28B8dZLR3/${occupation}/y/0/10`;

        
        $.ajax({
            url: queryUrl,
            dataType: 'json',
            type: 'GET',
            beforeSend: function (xhr) {

                xhr.setRequestHeader('Authorization', 'Bearer ' + 'KZasPLkGaB4qx+wuKxVDBoBHMO3iu+sTcYuhf9Et/1ueVH3efsEr3OEpWUXl24ukjrYWm8GTLn94+RbOE/FKKg==')
            },
            success: function (response) {
                var occTitle = response.OccupationList[0].OnetTitle;
                occCode = response.OccupationList[0].OnetCode;
                //   console.log(response.OccupationList)
                //  console.log(occTitle);
                //  console.log(occCode);
            }
        }).then(function () {
            
            $.ajax({
                url: `https://api.careeronestop.org/v1/occupation/NzX2rM28B8dZLR3/${occCode}/${cityStateZip}?training=false&interest=false&videos=false&tasks=false&dwas=false&wages=true&alternateOnetTitles=false&projectedEmployment=true&ooh=false&stateLMILinks=false&relatedOnetTitles=false&skills=false&knowledge=false&ability=false&trainingPrograms=false`,
                dataType: 'json',
                type: 'GET',
                beforeSend: function (xhr) {

                    xhr.setRequestHeader('Authorization', 'Bearer ' + 'KZasPLkGaB4qx+wuKxVDBoBHMO3iu+sTcYuhf9Et/1ueVH3efsEr3OEpWUXl24ukjrYWm8GTLn94+RbOE/FKKg==')
                },
                success: function (response) {
                    console.log(response);
                    var myRoot = response.OccupationDetail[0];
                    var title = myRoot.OnetTitle;
                    console.log(title);
                    var localWages = myRoot.Wages.BLSAreaWagesList;
                    var natWages = myRoot.Wages.NationalWagesList;
                    console.log(localWages);
                    for (var i = 0; i < localWages.length; i++) {
                        if (localWages[i].RateType === 'Annual') {
                            console.log('City median income: ' + localWages[i].Median);
                          //  $('#someHTMLid').text(localWages[i].Median);
                        }
                    }
                    for (var i = 0; i < natWages.length; i++) {
                        if (natWages[i].RateType === 'Annual') {
                            console.log('National median income: ' + natWages[i].Median);
                         //   $('#someHTMLid').text(natWages[i].Median);
                        }
                    }
                    console.log(myRoot);
                }
            });
        });



    });



    $('#weather').on('click', function (e) {
        e.preventDefault();
        console.log("wasclicked")
        WaetherCall()
    })


    //for pulling correct temp
    var units = 'imperial';
    //weather function
    function WaetherCall() {
        //will take input from search based on lat and long
        var inputWeather = "New York"   //$("#search-input").val().trim() ;
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
            //taking all infor from api
            console.log(data)
            lat = data.city.coord.lat;
            lon = data.city.coord.lon;
            city = data.city.name;
            cityPop = data.city.population;
            highF = Math.round(data.list[0].main.temp_max) + '°';
            lowF = Math.round(data.list[0].main.temp_min) + '°';
            description = data.list[0].weather[0].description;
            icon = data.list[0].weather[0].icon;
            console.log(lat, lon)
            console.log(city, cityPop)
            console.log(lowF, highF, description)
            //appending info
            $('#city').html('city: ' + city)
            $('#cityPop').html('cityPop: ' + cityPop);
            $('#description').html('description: ' + description)
            $('#highF').html('highF: ' + highF);
            $('#lowF').html('lowF: ' + lowF);
            //based on weather lat and lon grabbing time information
            var times_Stamp = (Math.round((new Date().getTime()) / 1000)).toString();
            $.ajax({
                url: "https://maps.googleapis.com/maps/api/timezone/json?location=" + lat + "," + lon + "&timestamp=" + times_Stamp,
                type: "POST",
            }).done(function (response) {
                var Cur_Date = new Date();
                var UTC = Cur_Date.getTime() + (Cur_Date.getTimezoneOffset() * 60000);
                var Loc_Date = new Date(UTC + (1000 * response.rawOffset) + (1000 * response.dstOffset));
                $("#timeOfLocation").html('Current Time : ' + Loc_Date);

            });
        });

    }


});