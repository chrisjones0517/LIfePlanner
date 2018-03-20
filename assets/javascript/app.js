$(document).ready(function () {



    $('#submit').on('click', function (e) {

        e.preventDefault();
        $("#data").empty();
        var occupation = $('#occupation').val();
        var cityStateZip = $('#cityStateZip').val();
        $('.occupation').text(occupation);
        $('#location').text(cityStateZip);
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
                console.log(response.OccupationList)
                console.log(occTitle);
                console.log(occCode);
            },
            error: function (request, status, errorThrown) {
                console.log('This is where the error will be output to the user.');
            }
        }).then(function () {
            
            $.ajax({
                url: `https://api.careeronestop.org/v1/occupation/NzX2rM28B8dZLR3/${occCode}/${cityStateZip}?training=false&interest=false&videos=false&tasks=false&dwas=false&wages=true&alternateOnetTitles=false&projectedEmployment=true&ooh=false&stateLMILinks=false&relatedOnetTitles=false&skills=false&knowledge=false&ability=false&trainingPrograms=false`,
                dataType: 'json',
                type: 'GET',
                beforeSend: function (xhr) {

                    xhr.setRequestHeader('Authorization', 'Bearer ' + 'KZasPLkGaB4qx+wuKxVDBoBHMO3iu+sTcYuhf9Et/1ueVH3efsEr3OEpWUXl24ukjrYWm8GTLn94+RbOE/FKKg==');
                },
                success: function (response) {
                    console.log(response);
                    var myRoot = response.OccupationDetail[0];
                    var title = myRoot.OnetTitle;
                    console.log(title);
                    var localWages = myRoot.Wages.BLSAreaWagesList;
                    var natWages = myRoot.Wages.NationalWagesList;
                    console.log(myRoot);
                    var stateStats = myRoot.Projections.Projections[0];
                    var nationalStats = myRoot.Projections.Projections[1];
                    var crntStateEmp = stateStats.EstimatedEmployment;
                    var projectedAnnualOpeningsSt = stateStats.ProjectedAnnualJobOpening;
                    var projectedAnnualOpeningsUS = nationalStats.ProjectedAnnualJobOpening;
                    var stateName = stateStats.StateName;
                    for (var i = 0; i < localWages.length; i++) {
                        if (localWages[i].RateType === 'Annual') {
                            console.log('City median income: ' + localWages[i].Median);
                            $('#medianCityWages').text(formatDollar(parseInt(localWages[i].Median)));
                        }
                    }
                    for (var i = 0; i < natWages.length; i++) {
                        if (natWages[i].RateType === 'Annual') {
                            console.log('National median income: ' + natWages[i].Median);
                               $('#USwages').text(formatDollar(parseInt(natWages[i].Median)));
                        }
                    }
                    console.log('US Median Per Capita Income: $29,829');
                    console.log(myRoot);
                    console.log(`Estimated current number of '${title}' jobs in ${stateName}: ${crntStateEmp}`); // Output to page

                    console.log(`Projected annual openings for '${title}' jobs in ${stateName}: ${projectedAnnualOpeningsSt}`);
                    console.log(`Estimated number of '${title}' jobs in the U.S.: ${projectedAnnualOpeningsUS}`)
                },
                error: function (request, status, errorThrown) {
                    console.log('This is where my error will go to be ouput to the user.');
                }
            });
        });
<<<<<<< HEAD

=======
>>>>>>> e6edaf58b03fac01a67a77baf6b3b479475eae4e



<<<<<<< HEAD

=======
>>>>>>> e6edaf58b03fac01a67a77baf6b3b479475eae4e
    });



    $('#weather').on('click', function (e) {
        e.preventDefault();
        console.log("wasclicked")
        WaetherCall()
    })
    var units = 'imperial';
    var inputWeather = "Dallas, TX, USA"
    //weather function
    function WaetherCall() {
        //will take input from search based on lat and long
        //$("#search-input").val().trim() ;

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
                getHist()
            });
        });

    }

    //    $('#climate').on('click', function (e) {
    function getHist() {
        // e.preventDefault();
        // url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&locationid=" + city + "&datatypeid=TMAX&startdate=2018-01-01&enddate=2018-04-01&units=standard"
        //getting city information from first weather api
        url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/search?limit=50&offset=1&resulttype=CITY&text=" + city + "&datasetid=GSOM&startdate=2018-01-01&enddate=2018-02-01&sortfield=score&sortorder=desc"
        var tokenFromNoaa = "WWKoJVmRVKlQKXOsSHFiQZXozlzIBzJY";
        $.ajax({
            url: url,
            headers: {
                token: tokenFromNoaa
            },
            success: function (data) {
                //console.log(data.results[0].station)
                console.log(data);
                cityToPass = data.results[0].id;
                console.log(cityToPass)

                //console.log(data.results[0].date)
            }
        })
<<<<<<< HEAD
            //passing city id after pact
=======
<<<<<<< HEAD
            //passing city id after pact
=======
            //passing city id after pact 
>>>>>>> e6edaf58b03fac01a67a77baf6b3b479475eae4e
>>>>>>> 0b8fd89fc305222422aa08ea35c1bc92319d21c5
            .then(function (data) {
                url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&locationid=" + cityToPass + "&datatypeid=TMAX&startdate=2018-01-01&enddate=2018-04-01&units=standard"
                $.ajax({
                    url: url,
                    headers: {
                        token: tokenFromNoaa
                    },
                }).then(function (data) {
                    console.log(data);
                    newMaxTemp = (data.results[0].value);
                    $('#newMaxTemp').html('lowF: ' + newMaxTemp);
                    // var convertWe = ((highF/10)*9/5+32)
                    // console.log(convertWe)

                    let myMaxTempPerMonth = new Set();
                    for (i = 0; i < data.results.length; i++) {
                        myMaxTempPerMonth = myMaxTempPerMonth.add(moment(data.results[i].date).format('MMM YYYY'));
                    }
                    console.log(myMaxTempPerMonth);


                });
            })
        //});
    }
<<<<<<< HEAD
    ///google auto city
=======
<<<<<<< HEAD

    function formatDollar(num) {
        var p = num.toFixed().split(".");
        return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
            return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
        }, "");
    }
=======
    ///google auto city 
>>>>>>> 0b8fd89fc305222422aa08ea35c1bc92319d21c5
    var input = document.getElementById('autocomplete');
    var search = new google.maps.places.Autocomplete(input, { types: ['(regions)'] });
    google.maps.event.addListener(search, 'place_changed', function () {

    });
    google.maps.event.addListener(search, 'place_changed', function (event) {
        var input = document.getElementById('autocomplete').value;
        var geocodeURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + input + '&key=AIzaSyC75PI0JP6R87nUSYn4R8iySVG0WGUZqMQ';
        console.log(input)
    });
>>>>>>> e6edaf58b03fac01a67a77baf6b3b479475eae4e
});

