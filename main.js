$(document).ready(function(){
var intiallist = localStorage.getItem("intiallist") == null? ['Optimism', 'Love', 'Submission', 'Awe', 'Disapp­roval', 'Remorse', 'Contempt', 'Aggres­siv­eness', 'Disapp­roval', 'Remorse', 'Contempt', 'Aggression', 'Optimism', 'Love', 'Submission', 
] : JSON.parse(localStorage.getItem("intiallist"))
var favoritelist = localStorage.getItem("favoritelist") == null? [] : JSON.parse(localStorage.getItem("favoritelist"))
var savetolocal = function(){
localStorage.setItem("intiallist",JSON.stringify(intiallist))
}

var populatingkeywords = function(){
    $("#keywordfield").empty()
    $.each(intiallist, function(index,value){
        $("#keywordfield").append(
            "<button class = 'key_word_button dashed_thin' gifname ="+value+">"+value+"</button>"
        )
    })
}
var populatingfavorite = function(){
    if (favoritelist.length!==0){
            $("#favgifs").empty()
            for (var i=0;i<favoritelist.length;i++){

            var queryURL = "http://api.giphy.com/v1/gifs/" +favoritelist[i]+"?api_key=KJr2h3l3NtuRfBZaBp1xAfNg6Z9YgNtD&limit=10";
            $.ajax({
            url: queryURL,
            method: "GET"
            })
            // After the data comes back from the API
            .then(function(response) {
                var results = response.data;
                console.log(results)
                        var gifDiv = $("<div class=gifdiv>");
                        var rating = results.rating.toUpperCase();
                        var p = $("<p class=ratingtag>").text("Rating: " + rating);
                        var imgbotbutton = $("<p class = botimgbutton>")
                        var dbut = $("<a class = downloadbutton>").text("Download")
                        dbut.attr("href",results.images.fixed_height.url)
                        dbut.attr("download","download.gif")
                        var dadd = $("<span class = addtofavsbutton>").text("Add to Favs")
                        dadd.attr("gifid",results.id)
                        imgbotbutton.append(dbut)
                        imgbotbutton.append("    ")
                        imgbotbutton.append(dadd)
                        var personImage = $("<img class= gifimg>").attr("src", results.images.fixed_height_still.url);
                        personImage.attr("data-still",results.images.fixed_height_still.url)
                        personImage.attr("data-animate",results.images.fixed_height.url)
                        personImage.attr("data-state","still")                                        
                        gifDiv.append(p);
                        gifDiv.append(personImage);
                        gifDiv.append(imgbotbutton)
                        $("#favgifs").prepend(gifDiv);
                })              
            }
    }
}
populatingfavorite()
populatingkeywords()
$(document).on("click",".key_word_button", function(){
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
            console.log(results)
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifDiv = $("<div class=gifdiv>");
                    var rating = results[i].rating.toUpperCase();
                    var p = $("<p class=ratingtag>").text("Rating: " + rating);
                    var imgbotbutton = $("<p class = botimgbutton>")
                    var dbut = $("<a class = downloadbutton>").text("Download")
                    dbut.attr("href",results[i].images.fixed_height.url)
                    dbut.attr("download","download.gif")
                    var dadd = $("<span class = addtofavsbutton>").text("Add to Favs")
                    dadd.attr("gifid",results[i].id)
                    imgbotbutton.append(dbut)
                    imgbotbutton.append("    ")
                    imgbotbutton.append(dadd)
                    var personImage = $("<img class= gifimg>").attr("src", results[i].images.fixed_height_still.url);
                    personImage.attr("data-still",results[i].images.fixed_height_still.url)
                    personImage.attr("data-animate",results[i].images.fixed_height.url)
                    personImage.attr("data-state","still")                                        
                    gifDiv.append(p);
                    gifDiv.append(personImage);
                    gifDiv.append(imgbotbutton)
                    $("#gifs-appear-here").prepend(gifDiv);
                }
            }            
        })
})
$(document).on("click", ".gifimg", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
    } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
    }
});
$("#submitbutton").on("click",function(){
    event.preventDefault();
    var addedemotion = $("#gifinput").val().trim();
    intiallist.push(addedemotion);
    console.log(intiallist)
    savetolocal() 
    populatingkeywords()  ;
})
$(document).on("click",".addtofavsbutton",function(){
    var gifid = $(this).attr("gifid")
    favoritelist.push(gifid)
    localStorage.setItem("favoritelist",JSON.stringify(favoritelist))
    console.log(favoritelist)
    populatingfavorite()
})
// End of document.ready
});