$(document).ready(function(){
var intiallist = ['Optimism', 'Love', 'Submission', 'Awe', 'Disapp­roval', 'Remorse', 'Contempt', 'Aggres­siv­eness', 'Disapp­roval', 'Remorse', 'Contempt', 'Aggression', 'Optimism', 'Love', 'Submission', 
]
var savetolocal = function(){
localStorage.setItem("intiallist",JSON.stringify(intiallist))
}
savetolocal()
intiallist = JSON.parse(localStorage.getItem("intiallist"));
var populatingkeywords = function(){
    $.each(intiallist, function(index,value){
        $("#keywordfield").append(
            "<button class = 'key_word_button dashed_thin' gifname ="+value+">"+value+"</button>"
        )
    })
}
populatingkeywords()
$(".key_word_button").on("click", function(){
        var gifname = $(this).attr("gifname");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gifname + "&api_key=KJr2h3l3NtuRfBZaBp1xAfNg6Z9YgNtD&limit=10";

      // Performing our AJAX GET request
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After the data comes back from the API
        .then(function(response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifDiv = $("<div class=gifdiv>");
                    var rating = results[i].rating.toUpperCase();
                    var p = $("<p class=ratingtag>").text("Rating: " + rating);
                    var personImage = $("<img class= gifimg>").attr("src", results[i].images.fixed_height.url);
                    gifDiv.append(p);
                    gifDiv.append(personImage);
                    $("#gifs-appear-here").prepend(gifDiv);
                }
            }            
        })
})
// End of document.ready
});