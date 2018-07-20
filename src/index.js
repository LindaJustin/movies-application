const $ = require('jquery');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');


  getMovies().then((movies) => {
    $("#moveList").append('Here are all the movies:'); //took out console log and tried to send to empty div
    movies.forEach(({title, rating, id}) => {
      console.log(`id#${id} - ${title} - rating: ${rating}`);
    });
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
  });



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
            .then (getMovies + newMovie)
            // .catch(/* handle errors */);
      });


//javascript should make a post request to /api/movies.
//once you figure out how to get console info to the div, then aim the db to that div. then
