$(document).ready(function () {



    $('#submit').on('click', function (e) {
        e.preventDefault();
        $("#data").empty();

        var queryUrl = 'https://api.careeronestop.org/v1/occupation/NzX2rM28B8dZLR3/mechanic/y/0/10';

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


});