$(document).ready(function () {

    

    $('#submit').on('click', function (e) {
        e.preventDefault();
        var query = $('#search').val();

        $.ajax({
            url: `https://developers.zomato.com/api/v2.1/search?q=${query}`,
            type: 'POST',
            headers: {
                'user-key': 'a935c21d6210ae554c1a824b76165e48'
            },
            data: {
                format: 'json'
            },
            success: function (data) {
                var rests = data.restaurants;
                console.log(rests);

                for (var i = 0; i < rests.length; i++) {
                    $('#data').append(`
                <ul>
                    <li>${rests[i].restaurant.average_cost_for_two}</li>
                    <li>${rests[i].restaurant.cuisines}</li>
                    <li>${rests[i].restaurant.location.address}</li>
                    <li><a href="#">${rests[i].restaurant.menu_url}</a></li>
                    <li>${rests[i].restaurant.name}</li>
                    <li><a href="#">${rests[i].restaurant.photos_url}</a></li>
                    <li>${rests[i].restaurant.price_range}</li>
                </ul>
                `);
                }
                //   $('#data').text(JSON.stringify(data.restaurants));
                console.log(data);
            },
            error: function (error) {
                console.log(error);
            }


            

        });

    });

    

    // https://developers.zomato.com/api/v2.1/search?q=tacos&count=20

    // a935c21d6210ae554c1a824b76165e48

    // fatSecret api key c40057b455724db2804c75ec57a9f9d6

    // fatSecret shared secret 991cdd08c3354611b1d5047ab42bbbd0

});