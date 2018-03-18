$(document).ready(function () {

    var city_stateId;

    $('#submit').on('click', function (e) {
        e.preventDefault();
        $("#data").empty();
some()
    });

    function some (){
var key
var pattern = $("#search").val();
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+pattern,
            dataType: "jsonp",
            success: function(data) {
              //$("#api").html(JSON.stringify(data, null, 3));    
              console.log(data)  
              for(key in data.query.pages){
                var titleArt = data.query.pages[key].title;
                var extractArt = data.query.pages[key].extract;
                var linkArt = 'https://en.wikipedia.org/?curid=' + data.query.pages[key].pageid;
                //console.log(linkArt)
                var imgArt;

                var contentHTML = '<div class="col-md-4"><div class="box-result"><div class="bg-result"></div><a href="' +  linkArt + '" target="_blank"><div class="box-content center-block"><div class="article-thumbnail"><img src="' + imgArt + '" alt="" /></div><h1>'+ titleArt +'</h1><p>' + extractArt + '</p></div></a></div></div>';

              }
            
            }
          });
    }


});