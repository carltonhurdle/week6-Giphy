//create a variable that will contain the URL string request 
//Initial Array of topics
var topics = ["Eeyore", "Stitch", "Roger", "Meeko", "Simba", "Kenai"];
//-------------------------------------
function renderButtons() {
$("#topic-view").empty();
  for (var i = 0; i < topics.length; i++) {
    var a = $("<button>");
    a.addClass("buttonStyle");
    a.attr("data-animal", topics[i]);
    a.text(topics[i]);
    $("#topic-view").append(a);
  }
}
$("#add-topic").on("click", function(event) {
  event.preventDefault();
  var topic = $("#topic-input").val().trim();
  topics.push(topic);
  renderButtons();
});

//--------------------------------------
$("button").on('click', function(){
  var x = $(this).data("animal");
  var gifAPIKEY = "&api_key=dc6zaTOxFJmzC";
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + x + gifAPIKEY + "&limit=10";
  $.ajax({url:queryURL, method:"GET"})
    .done(function(response){
      var results = response.data; 
      for (var i = 0; i < results.length; i++){
        var animalDiv = $("<div>");
        var p = $("<p>"); 
        p.text("Rating: " + results[i].rating);
        var animalImage = $("<img>");
        animalImage.attr("src", results[i].images.fixed_height.url);
        animalDiv.append(p);
        animalDiv.append(animalImage);
        $("#gifsGoHere").prepend(animalDiv);
      }
      })
    })

//--------------------------------------

