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
              $("#movieList").append(`<div><span>ID: ${id}</span><span> ${title}</span><span>rating: ${rating}</span><button id="editMovieButton">Edit</button><button type="button" class="deleteMovieButton">X</button></div>`);
              $(".deleteMovieButton").click(function(event) {
                  event.preventDefault();
                  let movieID = $(this).parent().children().first().html();
                  let url = "/api/movies/" + movieID;
                  console.log(movieID);
                  console.log(url);

                  const options = {
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
          });
      }).catch((error) => {
          alert('Oh no! Something went wrong.\nCheck the console for details.');
          console.log(error);
      });
  };
  genMovie();

// $(".deleteMovieButton").click(function(event) {
//     event.preventDefault();
//
//     let url = "/api/movies/1";
//     const options = {
//         method: "DELETE"
//     };
//     fetch(url, options)
//         .then((response) => {
//             response.json();
//         })
//         // .catch(/* handle errors */);
//         .then(() => {
//             genMovie();
//         });
// });


  $("#userSubmit").click(function(event){
      event.preventDefault();
      let movieTitle = $("#userAddMovie").val();
      let movieRating = $('input[name=userRating]:checked').val();
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


