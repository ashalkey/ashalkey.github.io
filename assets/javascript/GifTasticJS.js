var topics = ['Jackie Chan', 'Bruce Lee', 'Tony Jaa', 'Donnie Yen', 
'Jet Li', 'Gennady Golovkin', 'Mike Tyson', 'Conor McGregor', 'Georges St. Pierre'];
var searchTerm = {q: ''};
var newTopic = '';
var newButtonIterator = 0;

for (var i = 0; i < topics.length; i++){
    var gifButton = $('<button>').addClass('btn btn-danger gif-button')
    .attr('topic', topics[i])
    .text(topics[i]);
    gifButton.appendTo('#gif-buttons');
}

$('.gif-button').click(gifButtonClicked);

$('#new-gif-button').click(function(event){
    newButtonIterator++;
    event.preventDefault();
    newTopic = $('#gif-topic').val().trim();
    var gifButton = $('<button>').addClass('btn btn-danger gif-button new-button-'+ newButtonIterator)
    .attr('topic', newTopic)
    .text(newTopic);
    gifButton.appendTo('#gif-buttons');
    $('.new-button-'+newButtonIterator).click(gifButtonClicked);
});

function gifButtonClicked() {
    $('.gif-img').remove();
    $('.rating').remove();
    $('.success-button').remove();
    var topic = $(this).attr('topic');
    searchTerm.q = topic;
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + $.param(searchTerm) + "&api_key=M1lXXefs46PgircNYcyBiwrJLlM3O6Vw&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(topic);
        
        for (var j = 0; j < response.data.length; j++) {

            var rating = $('<p>').text("Rating: " + response.data[j].rating)
            .addClass('rating');

            var myGif = $('<img>')
            .attr({'src': response.data[j].images.original_still.url,
                   'alt': response.data.title,
                   'img-state': 'still',
                   'img-still': response.data[j].images.original_still.url,
                   'img-animate': response.data[j].images.original.url})
            .addClass('gif-img img-fluid');
            // Not sure how to solve the cross-origin issue with the download attribute
            // var downloadlink = $('<a>').attr({'href': response.data[j].images.original.url,
            //                                   'download': response.data[j].images.title + '.gif'});
            // var downloadButton = $('<button>').addClass('btn btn-success success-button btn-block')
            //                                   .text("Download")
            //                                   .css('width', response.data[j].images.original.width).click();
            // downloadlink.append(downloadButton);
            $('#gifs').append(myGif).append(rating);
            // .append(downloadlink)
        }

        $('.gif-img').click(function(){
            var state = $(this).attr('img-state');
            if(state === 'still'){
            $(this).attr({'src': $(this).attr('img-animate'),
                          'img-state': 'active'});
            }
            else{
                $(this).attr({'src': $(this).attr('img-still'),
                              'img-state': 'still'});
            }
        });
    });
}