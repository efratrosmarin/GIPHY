$(document).ready(function () {


$("button").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var person = $(this).attr("data-person");
    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      person + "&api_key=dc6zaTOxFJmzC&limit=10";
    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function(response) {
        
          console.log(response)
        // Storing an array of results in the results variable
        var results = response.data;
        // Looping over every result item
        for (var i = 0; i < results.length; i++) {
          // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div with the class "item"
            var gifDiv = $("<div class='item'>");
            // Storing the result item's rating
            var rating = results[i].rating;
            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);
            // Creating an image tag
            var personImage = $("<img>");
            // Giving the image tag a src attribute of a proprty pulled off the
            // result item
            personImage.attr("src", results[i].images.fixed_height.url);
            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(personImage);
            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").prepend(gifDiv);
          }
        }
      });
  });
  



  var persons = [];
      // displaypersonInfo function re-renders the HTML to display the appropriate content
      function displaypersonInfo() {
        var person = $(this).attr("data-person");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      person + "&api_key=dc6zaTOxFJmzC&limit=10";
        // Creating an AJAX call for the specific person button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

          console.log(response);
          // Creating a div to hold the person
          var personDiv = $("<div class='person'>");
          // Storing the rating data
          var rating = response.rating;
          // Creating an element to have the rating displayed
          var pOne = $("<p>").text(rating);
          // Displaying the rating
          personDiv.append(pOne);
          // Storing the release year
          
          // Retrieving the URL for the image
          var imgURL = response.images;
          // Creating an element to hold the image
          var images = $("<img>").attr("src", imgURL);
          // Appending the image
          personDiv.append(images);
          // Putting the entire person above the previous persons
          $("#persons-view").prepend(personDiv);
        });
      }
      // Function for displaying person data
      function renderButtons() {
        // Deleting the persons prior to adding new persons
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Looping through the array of persons
        for (var i = 0; i < persons.length; i++) {
          // Then dynamicaly generating buttons for each person in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of person-btn to our button
          a.addClass("person-btn");
          // Adding a data-attribute
          a.attr("data-person", persons[i]);
          // Providing the initial button text
          a.text(persons[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }
      // This function handles events where a person button is clicked
      $("#add-person").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var person = $("#person-input").val().trim();
        // Adding person from the textbox to our array
        persons.push(person);
        // Calling renderButtons which handles the processing of our person array
        renderButtons();
      });
      // Adding a click event listener to all elements with a class of "person-btn"
      $(document).on("click", ".person-btn", displaypersonInfo);
      // Calling the renderButtons function to display the intial buttons
      renderButtons();

});//ends document