//create buttons in Jquery
$(function(){
  renderButtons(topics, 'searchButton', '#topicsArea');
})


var topics = ["Eeyore", "Stitch", "Roger Rabbit", "Meeko", "Simba", "Kenai"];
 
//Function to add in buttons and empty the area each time to prevent duplicates
 function renderButtons(topics, classToAdd, areaToAddTo){
  $(areaToAddTo).empty();
  //for loop 
  for(var i=0; i < topics.length; i++){
    var a = $(' <button> '); //modify the button element
    a.addClass(classToAdd);
    a.attr('data-type', topics[i]);
    a.text(topics[i]);
    $(areaToAddTo).append(a);
  }

 }
//document on click
 $(document).on('click', '.searchButton', function(){
  var type = $(this).data('type');
  //console.log(type);
  var queryURL = "http://api.giphy.com/v1/gifs/search?q="+type+"&api_key=dc6zaTOxFJmzC" + "&limit=10";
  $.ajax({url:queryURL, method:'GET'})
  .done(function(response){
    for(var i=0; i< response.data.length; i++){
      //variables declare
      var searchDiv = $('<div class="topic-item">');
      var rating = response.data[i].rating;
      var p = $('<p>').text("Rating: " + rating);
      var animated = response.data[i].images.fixed_height.url;
      var still = response.data[i].images.fixed_height_still.url;
      var image = $('<img>');
      //attributes
      image.attr('src', still);
      image.attr('data-still', still);
      image.attr('data-animated', animated);
      image.attr('data-state', 'still');
      image.addClass('searchImage');
      //append
      searchDiv.append(p);
      searchDiv.append(image);
      $('#gifsGoHere').append(searchDiv);
    }
  })  
 })

//Animating the gifs on click 
 $(document).on('click', '.searchImage', function(){
  var state = $(this).attr('data-state');
  if(state == 'still'){
    $(this).attr('src', $(this).data('animated'));
    $(this).attr('data-state', 'animated');
  } else {
    $(this).attr('src', $(this).data('still'));
    $(this).attr('data-state', 'still');
  }
 })

//Enabling the Text Box to add a button via JQuery/ not working D:< table flip!
$("#add-topic").on('click', function(){
    var newTopic = $('input').eq(0).val();
    topics.push(newTopic);
    renderButtons(topics, 'searchButton', '#topicsArea');
    return false;
})