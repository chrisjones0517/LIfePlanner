$(document).ready(function () {

    var database = firebase.database();
    var ref = database.ref('users');
    ref.on('value', dataChange, errData);


    var container = document.getElementById('visualization');

    $('#submit').on('click', function (e) {
        e.preventDefault();
        var userName = $('#userName').val();
        var calThisMeal = $('#calThisMeal').val();
        var data = {
            userID: userName,
            calories: calThisMeal
        }
        ref.push(data);
        console.log(data);


    });

    function dataChange(data) {
        var dataArr = [];

        data.forEach(function (childData) {
            var item = childData.val();
            item.key = childData.key;
            dataArr.push(item);

            var items = [
                { x: '2014-06-11', y: 10 },
                { x: '2014-06-12', y: 25 },
                { x: '2014-06-13', y: 30 },
                { x: '2014-06-14', y: 10 },
                { x: '2014-06-15', y: 15 },
                { x: '2014-06-16', y: 30 }
            ];

            var dataset = new vis.DataSet(items);
            var options = {
                start: '2014-06-10',
                end: '2014-06-18'
            };
            var graph2d = new vis.Graph2d(container, dataset, options);

        });

        return dataArr
    }

    function errData(error) {
        console.log('Error!');
        console.log(error);
    }

});

