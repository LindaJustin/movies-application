const $ = require('jquery');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');


  const genMovie = () => {
      getMovies().then((movies) => {
          $("#movieList").html("");
          movies.forEach(({title, rating, id}) => {
              console.log(`id#${id} - ${title} - rating: ${rating}`);
              $("#movieList").append(`<div>${title}&nbsp<span>rating: ${rating}</span>&nbsp<button class="editMovieButton" data-id="${id}">Edit</button>&nbsp<button type="button" class="deleteMovieButton" data-id="${id}">X</button></div>`);
          });
      });
  };
  genMovie();

//target the class of container so we can globally listen for the click
  $(".container").on("click", ".deleteMovieButton", function(event) {
      event.preventDefault();
      // let movieID = $(this).parent().children().first().html();
      let movieID = $(this).attr("data-id");
      let url = "/api/movies/" + movieID;
      console.log(movieID);
      console.log(url);

      let options = {
          method: "DELETE"
      };
      fetch(url, options)
          .then((response) => {
              response.json();
          })
          // .catch(/* handle errors */);
          .then(() => {
              genMovie();
          });
  });

$(".container").on("click", ".editMovieButton", function(event) {
      event.preventDefault();
      console.log("click worked");
      // let movieID = $(this).parent().children().first().html();
      let movieID = $(this).attr("data-id");
      console.log(movieID);

      let request = $.ajax({
          url: 'api/movies/' + movieID,
          method: "GET",
          data: movieID
      });
      request.done((movie) => {

        console.log(movie);
        $('#userAddMovie').val(movie.title);
        // $('.userRating').val(movie.rating);
        //   $('[name=userRating]').val(movie.rating);
          $('input[name=userRating]:checked').val(movie.rating); //please work


      });

      // let url = "/api/movies/" + movieID;
      // console.log(movieID);
      // console.log(url);
      // let options = {
      //     method: "GET"
      // };
      // fetch(url, options)
      //     .then((response) => {
      //         response.json();
      //     })
      //     // .catch(/* handle errors */);
      //     .then((movie) => {
      //         console.log("get here");
      //         // $('#userAddMovie').val(movie.title);
      //     });
  // }).catch((error) => {
  //       alert('Oh no! Something went wrong.\nCheck the console for details.');
  //       console.log(error);
    });




  $("#userSubmit").click(function(event){
      event.preventDefault();
      let movieTitle = $("#userAddMovie").val();
      let movieRating = $('input[name=userRating]:checked').val();
      console.log(movieRating);
      const newMovie = {title: movieTitle, rating: movieRating};
      const url = "/api/movies";
      const options = {
        method: "POST",
          headers: {
          "Content-Type": "application/json",

          },
          body: JSON.stringify(newMovie),
      };
        fetch(url, options)
            .then((response) => {
              response.json();
            })
            // .catch(/* handle errors */);
            .then(() => {
              genMovie();

            });
      });


