$(document).ready(function () {


  $("button").on("click", function () {
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
      .then(function (response) {

        console.log(response)
        // Storing an array of response.data[1] in the response.data[1] variable
        // Looping over every result item
        for (var i = 0; i < response.data[1].length; i++) {
          // Only taking action if the photo has an appropriate rating
          if (response.data[1][i].rating !== "r" && response.data[1][i].rating !== "pg-13") {
            // Creating a div with the class "item"
            var gifDiv = $("<div class='item'>");
            // Storing the result item's rating
            var rating = response.data[1][i].rating;
            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);
            // Creating an image tag
            var personImage = $("<img>");
            // Giving the image tag a src attribute of a proprty pulled off the
            // result item
            personImage.attr("src", response.data[1][i].images.fixed_height.url);
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
    }).then(function (response) {

      console.log(response);
      console.log("data", response.data);
      $("#gifs-appear-here").empty();
      for (var i = 0; i < response.data.length; i++) {
        // Creating a div to hold the person
        var divHolder = $("<div class='col-12 col-md-4'>");
        var personDiv = $("<div class='person card'>");
        // Storing the rating data
        // var rating = response.data[i].rating;

        console.log("data detail", response.data);
        // Creating an element to have the rating displayed
        var tvRating = $("<p>").text(response.data[i].rating);
        tvRating.addClass("card-body");
        // Displaying the rating
        personDiv.append(tvRating);



        var imgTv = response.data[i].images.original.url;
        // Creating an element to hold the image
        var images = $("<img>").attr("src", imgTv);
        // Appending the image
        personDiv.append(images);
        divHolder.append(personDiv);
        // Putting the entire person above the previous persons
        $("#gifs-appear-here").prepend(divHolder);
      }
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

      a.addClass("bttn-gradient gifBtn bttn-md bttn-primary");
      // Adding a data-attribute
      a.attr("data-person", persons[i]);
      // Providing the initial button text
      a.text(persons[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }
  // This function handles events where a person button is clicked
  $("#add-person").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var person = $("#person-input").val().trim();
    // Adding person from the textbox to our array
    persons.push(person);
    // Calling renderButtons which handles the processing of our person array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "person-btn"
  $(document).on("click", ".gifBtn", displaypersonInfo);
  // Calling the renderButtons function to display the intial buttons
  renderButtons();

}); //ends document