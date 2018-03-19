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

                    xhr.setRequestHeader('Authorization', 'Bearer ' + 'KZasPLkGaB4qx+wuKxVDBoBHMO3iu+sTcYuhf9Et/1ueVH3efsEr3OEpWUXl24ukjrYWm8GTLn94+RbOE/FKKg==')
                },
                success: function (response) {
                    //   console.log(response);
                    var myRoot = response.OccupationDetail[0];
                    var title = myRoot.OnetTitle;
                    console.log(title);
                    var localWages = myRoot.Wages.BLSAreaWagesList;
                    var natWages = myRoot.Wages.NationalWagesList;
                    console.log(localWages);
                    var stateStats = myRoot.Projections.Projections[0];
                    var nationalStats = myRoot.Projections.Projections[1];
                    var crntStateEmp = stateStats.EstimatedEmployment;
                    var projectedAnnualOpeningsSt = stateStats.ProjectedAnnualJobOpening;
                    var projectedAnnualOpeningsUS = nationalStats.ProjectedAnnualJobOpening;
                    var stateName = stateStats.StateName;
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
        

        var numbeoUrl = `http://anyorigin.com/go?url=https%3A//www.numbeo.com/api/indices%3Fapi_key%3D2iev2m2k4slcbo%26query%3D${cityStateZip}&callback=?`;

        $.getJSON(numbeoUrl, function (data) {
            console.log(data.contents);
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
            console.log(lowF, highF, description)
        });


    }

    var climateUrl = `https://www.ncdc.noaa.gov/cdo-web/api/v2/locations/`;

    $('#climate').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: climateUrl,
            data: { CITY: 'houston,tx' },
            method: 'GET',
            headers: { token: 'WWKoJVmRVKlQKXOsSHFiQZXozlzIBzJY' }
        }).then(function (response) {
            console.log(response);
        });
    });



});

